targetScope = 'resourceGroup'

@description('Location for all resources')
param location string = resourceGroup().location

@description('Name of the existing Cosmos DB account')
param cosmosAccountName string = 'cosmos-cloudresume'

@description('Name of the Function App')
param functionAppName string = 'func-cloudresume-${uniqueString(resourceGroup().id)}'

@description('Name of the Storage Account for Azure Functions')
param storageAccountName string = take('stcloudresume${uniqueString(resourceGroup().id)}', 24)

// 1. Storage Account required by Azure Functions runtime & Blog Image hosting
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: true
  }
}

// 1a. Blob Service Configuration
resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: [
            'https://*.azurestaticapps.net'
            'http://localhost:4321'
            'https://www.alfiehine.co.uk'
          ]
          allowedMethods: [
            'GET'
            'HEAD'
            'POST'
            'PUT'
            'DELETE'
          ]
          maxAgeInSeconds: 3600
          exposedHeaders: [
            '*'
          ]
          allowedHeaders: [
            '*'
          ]
        }
      ]
    }
  }
}

// 1b. Blog Images Public Container
resource blogImagesContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: blobService
  name: 'blog-images'
  properties: {
    publicAccess: 'Blob'
  }
}

// 2. Hosting Plan (Serverless Consumption Y1 - Linux)
resource hostingPlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: 'plan-cloudresume'
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
  properties: {
    reserved: true
  }
}

// 3. Existing Cosmos DB Reference
resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2023-11-15' existing = {
  name: cosmosAccountName
}

// 3a. Cosmos DB Database: AzureResume
resource cosmosDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2023-11-15' = {
  parent: cosmosAccount
  name: 'AzureResume'
  properties: {
    resource: {
      id: 'AzureResume'
    }
  }
}

// 3b. Cosmos DB Container: Counter
resource cosmosCounterContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-11-15' = {
  parent: cosmosDatabase
  name: 'Counter'
  properties: {
    resource: {
      id: 'Counter'
      partitionKey: {
        paths: [
          '/id'
        ]
        kind: 'Hash'
      }
    }
  }
}

// 3c. Cosmos DB Container: Posts
resource cosmosPostsContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-11-15' = {
  parent: cosmosDatabase
  name: 'Posts'
  properties: {
    resource: {
      id: 'Posts'
      partitionKey: {
        paths: [
          '/slug'
        ]
        kind: 'Hash'
      }
    }
  }
}

// 4. Azure Function App (Linux)
resource functionApp 'Microsoft.Web/sites@2023-01-01' = {
  name: functionAppName
  location: location
  kind: 'functionapp,linux'
  properties: {
    reserved: true
    serverFarmId: hostingPlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|20'
      appSettings: [
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'STORAGE_CONNECTION_STRING'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'STORAGE_ACCOUNT_NAME'
          value: storageAccount.name
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~4'
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'node'
        }
        {
          name: 'COSMOS_DB_CONNECTION_STRING'
          value: cosmosAccount.listConnectionStrings().connectionStrings[0].connectionString
        }
      ]
      cors: {
        allowedOrigins: [
          'https://*.azurestaticapps.net'
          'http://localhost:4321'
          'https://www.alfiehine.co.uk'
        ]
      }
    }
  }
}

// 5. Outputs
output functionAppName string = functionApp.name
output storageAccountName string = storageAccount.name
