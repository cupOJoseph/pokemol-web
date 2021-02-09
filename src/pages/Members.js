import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Flex, Box, Stack, Button } from '@chakra-ui/react';

import ActivitiesFeed from '../components/activitiesFeed';
import MemberCard from '../components/memberCard';
import MemberInfo from '../components/memberInfo';
import ContentBox from '../components/ContentBox';
import TextBox from '../components/TextBox';
import { getMemberActivites, getMembersActivites } from '../utils/activities';
import { getCopy } from '../utils/metadata';
import MembersChart from '../components/membersChart';
import ListSort from '../components/listSort';
import { membersSortOptions } from '../utils/memberContent';
import MemberFilters from '../components/memberFilters';
import MainViewLayout from '../components/mainViewLayout';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { daoConnectedAndSameChain } from '../utils/general';

const Members = ({
  members,
  activities,
  overview,
  daoMember,
  daoMembers,
  customTerms,
  daoMetaData,
}) => {
  const { daoid, daochain } = useParams();
  const { address, injectedChain } = useInjectedProvider();
  const [selectedMember, setSelectedMember] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [listMembers, setListMembers] = useState(members);
  const [sort, setSort] = useState();
  const [filter, setFilter] = useState();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrolledStyle = {
    position: 'sticky',
    top: 20,
  };

  useEffect(() => {
    if (members && members.length > 0) {
      sortMembers();
    }
  }, [members, sort, filter]);

  const sortMembers = () => {
    const sortedMembers = members.filter((member) => {
      const active = +member.shares > 0 || (+member.loot > 0 && !member.jailed);
      switch (filter?.value) {
        case 'active': {
          return member.exists && active;
        }
        case 'inactive': {
          return member.exists && !active && !member.jailed;
        }
        case 'jailed': {
          return member.jailed;
        }
        default: {
          return member.exists && active;
        }
      }
    });

    if (sort) {
      sortedMembers.sort((a, b) => {
        if (sort.value === 'joinDateAsc') {
          return +a.createdAt - +b.createdAt;
        } else if (sort.value === 'joinDateDesc') {
          return +b.createdAt - +a.createdAt;
        } else {
          return +b[sort.value] - +a[sort.value];
        }
      });
    }

    setListMembers([...sortedMembers]);
  };
  console.log(
    daoConnectedAndSameChain(address, injectedChain?.chainId, daochain),
  );
  console.log(address, injectedChain?.chainId, daochain);

  const ctaButton = daoConnectedAndSameChain(
    address,
    injectedChain?.chainId,
    daochain,
  ) && (
    <Button as={Link} to={`/dao/${daochain}/${daoid}/proposals/new/member`}>
      Apply
    </Button>
  );

  return (
    <MainViewLayout
      header={'Bank'}
      headerEl={ctaButton}
      customTerms={customTerms}
      isDao={true}
    >
      <Flex>
        <ListSort sort={sort} setSort={setSort} options={membersSortOptions} />
        <MemberFilters filter={filter} setFilter={setFilter} />
      </Flex>
      <Flex wrap='wrap'>
        <Box
          w={['100%', null, null, null, '60%']}
          pr={[0, null, null, null, 6]}
          pb={6}
        >
          <ContentBox mt={6}>
            <Flex>
              <TextBox w='43%' size='xs'>
                {getCopy(customTerms, 'member')}
              </TextBox>
              <TextBox w='15%' size='xs'>
                Shares
              </TextBox>
              <TextBox w='15%' size='xs'>
                Loot
              </TextBox>
              <TextBox size='xs'>Join Date</TextBox>
            </Flex>
            {listMembers &&
              listMembers?.map((member) => {
                return (
                  <MemberCard
                    key={member.id}
                    member={member}
                    selectMember={setSelectedMember}
                    selectedMember={selectedMember}
                  />
                );
              })}
          </ContentBox>
        </Box>
        <Box w={['100%', null, null, null, '40%']}>
          <Stack style={scrolled ? scrolledStyle : null} spacing={4}>
            <Box>
              {selectedMember ? (
                <MemberInfo member={selectedMember} customTerms={customTerms} />
              ) : (
                <>
                  {daoMember && (
                    <Flex justify='space-between' mb={5}>
                      <TextBox size='xs'>Snapshot</TextBox>
                      <TextBox
                        as={Link}
                        to={`/dao/${daochain}/${daoid}/profile/${daoMember.memberAddress}`}
                        color='inherit'
                        size='xs'
                      >
                        View My Profile
                      </TextBox>
                    </Flex>
                  )}
                  <MembersChart
                    overview={overview}
                    daoMembers={daoMembers}
                    daoMetaData={daoMetaData}
                  />
                </>
              )}
            </Box>

            {selectedMember ? (
              <ActivitiesFeed
                limit={2}
                activities={activities}
                hydrateFn={getMemberActivites(selectedMember.memberAddress)}
              />
            ) : daoMember ? (
              <ActivitiesFeed
                limit={2}
                activities={activities}
                hydrateFn={getMembersActivites}
              />
            ) : null}
          </Stack>
        </Box>
      </Flex>
    </MainViewLayout>
  );
};

export default Members;