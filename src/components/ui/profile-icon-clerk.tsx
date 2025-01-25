import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";


export default function ProfileIconClerk() {
  return (
    <>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
    </>
  )
}
