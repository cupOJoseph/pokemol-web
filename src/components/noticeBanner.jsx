import React from 'react';
import { Box, Text, Link, Icon } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';

const NoticeBanner = () => {
  return (
    <Box w='100%' backgroundColor='orange.500' p='10px' textAlign='center'>
      <Text fontSize='lg' fontWeight='700'>
        NOTICE
      </Text>
      <Text fontSize='md'>
        The Rinkeby testnet is nearing end-of-life and our support is moving to
        Goerli. Please summon any new test DAOs on Goerli and existing DAOs on
        Rinkeby will no longer be supported in the near future.{' '}
        <Link
          color='white'
          href='https://blog.ethereum.org/2022/06/21/testnet-deprecation'
          isExternal
        >
          See deprecation announcement here.
          <Icon as={RiExternalLinkLine} ml='2px' mt='-3px' />
        </Link>
      </Text>
    </Box>
  );
};

export default NoticeBanner;
