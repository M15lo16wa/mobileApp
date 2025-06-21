import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Camera() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    // initialisation de l'etat de flash
    const [flashMode, setFlashMode] = useState<'on'|'off'>('off');

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
    // fonction d'activation de flash
    function toggleFlashMode(){
        setFlashMode(current => (current === 'off' ? 'on' : 'off'));
        console.log(flashMode);
    }
    function scannerQrCode(data: any){
        // console.log(data.data);
        const object=JSON.parse(data.data);
        Alert.alert('Données scannées','nom: '+object.nom + '\n prenom: '+object.prenom + '\n Age: '+object.Age + '\n Niveau: '+object.Niveau +'\n Adresse: '+object.Adresse);

    }
    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} flash='auto' barcodeScannerSettings={{barcodeTypes:['qr', 'upc_a']}} onBarcodeScanned={scannerQrCode}>
                <View style={styles.qrCodeBarre}></View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    {/* definition du button d'activation de flash*/}
                    <TouchableOpacity style={styles.button} onPress={toggleFlashMode}>
                        <Text style={styles.text}>flashMode:{flashMode === 'on'? 'Desactiver le Flash': 'Activer le flash'}</Text>
                    </TouchableOpacity>
                </View>
                
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    qrCodeBarre:{
        position: 'absolute',
        top:'30%',
        left:'15%',
        width: '70%',
        borderWidth: 2,
        borderColor:'blue',
        borderRadius: 5,
        backgroundColor:'transparent'
    }
});
