import { AlertDialog, Button, Flex } from "@radix-ui/themes";


export function ConfirmDonate({onConfirm, children}: {onConfirm: () => void, children: React.ReactNode}) {
    return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            {children}
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Confirm Donation</AlertDialog.Title>
            <AlertDialog.Description size="2">
                Are you sure to Donate your deposit ? 
                Thank you very much for your support!
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                        Cancel
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button  variant="solid" color="red" onClick={onConfirm}>
                        Donate
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
    );
}