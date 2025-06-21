import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg"; 
export default function qrCode(){
    const info = {
        nom:'Molowa',
        prenom: 'royal',
        Age:19,
        Niveau:'Licence 3',
        Adresse:'Grand-Dakar'

    }
    const infJson=JSON.stringify(info)
    return (<View style={style.container}>
        <QRCode value={infJson} size={200}/>
    </View>
    )
}
// definition du style de code css
const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})