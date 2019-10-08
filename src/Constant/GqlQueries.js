import gql from 'graphql-tag';

export const GET_SERVICE = gql`
  query getService($serviceName: String) {
    service(serviceName: $serviceName, lastConfig: true) {
      name
      description
      environments {
        name
        configs {
          data
          version
          type
          webHook {
            url
            method
          }
        }
      }
    }
  }
`;

export const GET_SERVICE_LIST = gql`
  {
    services {
      name
      description
      environments {
        name
      }
    }
  }
`;

export const GET_CONFIGS = gql`
  query Env($serviceName: String, $envName: String) {
    getConfigs(serviceName: $serviceName, environment: $envName, raw: true) {
      name
      configs {
        data
        type
        version
      }
    }
  }
`;

export const UPDATE_CONFIG = gql`
  mutation updateConfig(
    $serviceName: String!
    $environmentName: String!
    $data: String!
    $type: String!
  ) {
    updateConfig(
      serviceName: $serviceName
      environmentName: $environmentName
      data: $data
      type: $type
    ) {
      success
      error
    }
  }
`;
export const DELETE_SERVICE = gql`
  mutation($serviceName: String!) {
    deleteService(serviceName: $serviceName) {
      success
    }
  }
`;
export const ADD_SERVICE = gql`
  mutation AddService($service: InputService!) {
    newService(service: $service) {
      success
      error
    }
  }
`;
export const UPDATE_SERVICE = gql`
  mutation UpdateService($service: InputService!, $originalName: String!) {
    updateService(service: $service, originalName: $originalName) {
      success
      error
    }
  }
`;

export const GET_GLOBAL_VAR = gql`
  query getGlobalVariable {
    getGlobalVariable
  }
`;

export const UPDATE_GLOBAL_VARIABLE = gql`
  mutation UpdateGlobalVariable($globalVariable: String!) {
    updateGlobalVariable(globalVariable: $globalVariable) {
      success
      error
    }
  }
`;
