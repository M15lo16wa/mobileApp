import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../views/login';
import Register from '../views/register';
import { addTaches } from '../components/addTaches';
import { addUsers } from '../components/addUsers';
import { getAllTaches } from '../components/getAllTaches';
import Camera from '../components/camera';
import qrCode from '../components/qrCode';

// Définir le type des routes
export type RootStackParamList = {
    login: undefined;
    register: undefined;
    addTaches: undefined;
    addUsers: undefined;
    getAllTaches: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* ajout de la page login */}
            <Stack.Screen name="login" component={Login} />
            {/* ajout de la page de registre */}
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="addTaches" component={addTaches} />
            <Stack.Screen name="addUsers" component={addUsers} />
            <Stack.Screen name="getAllTaches" component={getAllTaches} />
            {/* Ecran pour la camera */}
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="qrCode" component={qrCode} />
        </Stack.Navigator>
    );
}