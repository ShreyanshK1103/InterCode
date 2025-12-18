import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

function App() {

  return (
    <>
      <h1>Welcome to the app</h1>
      
      {/* If the user is singedout then show the button  */}
      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      {/* If the user is signedin then show the button  */}
      <SignedIn>
          <SignOutButton/>
      </SignedIn>

      <UserButton />

    </>
  );
}

export default App
