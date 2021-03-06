import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import AddPeopleToCourse from "./AddPeopleToCourse";
import CourseHeader from "./CourseHeader";
import {
  Stack,
  Heading,
  Text,
  Flex,
  Box,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Link,
  Avatar
} from "@chakra-ui/core";
import NextLink from "next/link";

const GET_COURSE_WITH_PEOPLE = gql`
  query GetCourseWithPeople($where: CourseWhereUniqueInput!) {
    course(where: $where) {
      id
      slug
      name
      title
      class_number
      users {
        id
        name
        email
        picture
      }
    }
  }
`;

export default function CoursePeople() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_COURSE_WITH_PEOPLE, {
    variables: {
      where: {
        slug: router.query.id
      }
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div>
      <CourseHeader course={data.course} />

      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Stat>
            <StatLabel>People</StatLabel>
            <StatNumber>{data.course.users.length}</StatNumber>
          </Stat>
        </Box>
        <Box>
          <AddPeopleToCourse courseID={data.course.id} />
        </Box>
      </Flex>

      <Stack spacing={3}>
        {data.course.users.map(person => {
          return (
            <Box shadow="sm" p="3" key={person.id}>
              <Flex align="center">
                <NextLink href="/users/[id]" as={`/users/${person.id}`}>
                  <Link>
                    <Avatar src={person.picture} name={person.name} mr={8} />
                  </Link>
                </NextLink>

                <Box>
                  <NextLink href="/users/[id]" as={`/users/${person.id}`}>
                    <Link>
                      <Heading size="sm">{person.name}</Heading>
                      <Text>{person.email}</Text>
                    </Link>
                  </NextLink>
                </Box>
              </Flex>
            </Box>
          );
        })}
      </Stack>
    </div>
  );
}
