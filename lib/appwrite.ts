import { Account, Avatars, Client, Databases, OAuthProvider, Storage } from "react-native-appwrite"
import * as Linking from 'expo-linking'
import { openAuthSessionAsync } from 'expo-web-browser';
export const config = {
    platform : 'com.jsm.restate',
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/V1',
    projectId : process.env.EXPO_PUBLIC_APPWRITE_PORJECT_ID || '67879855000621eba696',
    databaseId : process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId : process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId : process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId : process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId : process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}

export const client = new Client()

    client.setEndpoint(config.endpoint!).setProject(config.projectId!).setPlatform(config.platform!)

    export const avatar = new Avatars(client);
    export const account = new Account(client);
    export const databases = new Databases(client);
    export const storage = new Storage(client);
 export async function Login() {
    try {
        const redirectUri = Linking.createURL('/');
        console.log('Redirect URI:', redirectUri);

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);
        console.log('OAuth2 Response:', response);

        if (!response) throw new Error('Failed to initiate OAuth');

        const browserResult = await openAuthSessionAsync(
            response.toString(),
             redirectUri
            )
             
        console.log('Browser Result:', browserResult);

        if (browserResult.type !== 'success') throw new Error('Failed authentication');

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret")?.toString();
        const userId = url.searchParams.get("userId")?.toString();

        console.log('Parsed OAuth URL:', { secret, userId });

        if (!secret || !userId) throw new Error('Invalid OAuth response');

        const session = await account.createSession(userId, secret);
        console.log('Created Session:', session);

        if (!session) throw new Error('Failed to create session');

        return true;
    } catch (error) {
        console.error('Login Error:', error);
        return false;
    }
}


 export async function Logout() {
    try {
        const result = await account.deleteSession("current");
        return result;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    

export async function getUser(){
    try {
        const response = await account.get()

        if(response.$id){
            const userAvatar = avatar.getInitials(response.name)

            return{
                ...response,
                avatar: userAvatar.toString()
            }
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

// write function to get property by id
export async function getPropertyById({ id }: { id: string }) {
    try {
      const result = await databases.getDocument(
        config.databaseId!,
        config.propertiesCollectionId!,
        id
      );
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }