import React from 'react';
import { Box } from '@chakra-ui/core';

import { useDao } from '../../contexts/PokemolContext';

const ProposalsActivityFeed = () => {
  const [dao] = useDao();
  // const [activities, setActivities] = useState([]);
  const proposalActivities = [
    {
      id: 1,
      molochAddress: dao.address,
      proposalId: 1,
      proposalType: 'funding',
      daoTitle: 'QuickDao',
      yesVotes: 5,
      noVotes: 3,
      activityFeed: {
        message: 'new proposal',
      },
    },
  ];

  // useEffect(() => {
  //   if (proposals) {
  //     const proposalActivities = proposals.map((proposal) => {
  //       return { ...proposal, daoTitle: dao.title };
  //     });

  //     setActivities(
  //       proposalActivities.sort((a, b) => +b.createdAt - +a.createdAt),
  //     );
  //   }
  // }, [proposals]);

  return (
    <>
      <Box
        mt={1}
        ml={6}
        textTransform='uppercase'
        fontSize='sm'
        fontFamily='heading'
      >
        Recent Activities
      </Box>
      {/* <ActivityFeedList activities={proposalActivities} /> */}
    </>
  );
};

export default ProposalsActivityFeed;
