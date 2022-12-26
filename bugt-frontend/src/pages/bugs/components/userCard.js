import { Avatar,Text,Box,HStack,Spacer,useColorModeValue } from "@chakra-ui/react";
export default function UserCard({userid,name,email,role,onClickfn}) {
    const boxbg = useColorModeValue('white', 'gray.900');

    return (
        <Box bg={boxbg} w={'100%'} padding={2} rounded='md' onClick={onClickfn} cursor={'pointer'}>
            <HStack>
                <Avatar src={`https://gravatar.com/avatar/${userid}?d=retro`} size='xs' />
                <Text>{name}</Text>
                {role &&
                <>
                <Spacer />
         <Text fontSize={'sm'} fontWeight={'semibold'}>{role}</Text>
                </>
                }
            </HStack>
            <Text>{email}</Text>
        </Box>
    )
}