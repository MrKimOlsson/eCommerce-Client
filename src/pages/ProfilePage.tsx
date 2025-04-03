import { useAuth } from "../hooks/useAuth"; // Import your useAuth hook

export const ProfilePage = () => {
    const context = useAuth(); // Use the hook to get the context

    // Logging the entire context for debugging
    console.log("Profile Page - user:", context.user);


    return (
        <div>
            <h2>Profile</h2>
            {context.user ? ( // Check if user exists
                <p>Logged in as: {context.user.username}</p>
            ) : (
                <p>No user logged in</p>
            )}
        </div>
    );
};