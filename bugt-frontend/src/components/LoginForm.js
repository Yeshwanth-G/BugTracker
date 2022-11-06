import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

export default function Login() {
    return (
        <VStack>
            <FormControl>
                <FormLabel>User id</FormLabel>
                <Input placeholder="Enter Email id" />
            </FormControl>
        </VStack>
    )
}
