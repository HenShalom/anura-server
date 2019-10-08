import React from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { SelectFileContext } from '../../Context/Contexts';
import InfoCad from './InfoCard';
import { DELETE_SERVICE, GET_SERVICE_LIST } from '../../Constant/GqlQueries';
import '../../styles/components/mainPage/infoViewer.scss';

const updateApolloCache = (selectedService, clickFile) => (cache, result) => {
  if (result.data.deleteService.success) {
    const { services } = cache.readQuery({ query: GET_SERVICE_LIST });
    cache.writeQuery({
      query: GET_SERVICE_LIST,
      data: { services: services.filter(s => s.name !== selectedService) }
    });
    toast.success('service deleted');
    clickFile('', '');
  } else toast.error('delete error');
};

const InfoViewer = () => {
  return (
    <SelectFileContext.Consumer>
      {({ selectedService, selectedEnvironment, clickFile }) => (
        <Mutation mutation={DELETE_SERVICE} update={updateApolloCache(selectedService, clickFile)}>
          {(deleteService, { data, error }) => {
            return (
              <InfoCad
                selectedService={selectedService}
                selectedEnvironment={selectedEnvironment}
                deleteService={() => deleteService({ variables: { serviceName: selectedService } })}
              />
            );
          }}
        </Mutation>
      )}
    </SelectFileContext.Consumer>
  );
};

export default InfoViewer;
