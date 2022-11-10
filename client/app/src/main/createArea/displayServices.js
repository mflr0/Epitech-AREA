import {View, StyleSheet} from "react-native";
import {Text} from "react-native-paper";
import {useEffect, useState} from "react";
import {checkService, getAbout, refreshToken} from "../../services/server";
import {useNavigate, useParams} from "react-router-native";
import {Oauth2} from '../../../config'
import * as WebBrowser from 'expo-web-browser'
import DataDisplayer from "../../dataDisplayer";

export default function DisplayServices() {
	const [actions, setActions] = useState([])
	const {serviceType} = useParams()
	const navigate = useNavigate()

	const getServerActions = async () => {
		const about = await getAbout()
		about.status !== 200 && navigate('/login')
		setActions(about.server.services.filter(e => serviceType === 'action' ? e.actions.length > 0 : e.reactions.length > 0))
	}

	useEffect(() => {
		getServerActions()
	}, [])

	return (
		<>
			<Text style={{fontSize: 40, color: 'white', textAlign: 'center'}}>Choose a{serviceType.startsWith('a') && 'n'} {serviceType}</Text>
			<View key='actionKey' style={styles.actionsContainer}>
				{actions.map((e, i) =>
					<>
						<DataDisplayer key={i} text={e.name} style={styles.actions} textStyle={styles.actionsText} onPress={async () => {
							if (Oauth2[e.name]) {
								const token = await refreshToken()
								token.status !== 200 && navigate('/login')
								const res = await checkService(token.token, e.name)
								console.log(res)
								if (res.status !== 200)
									return WebBrowser.openBrowserAsync(Oauth2[e.name].oauth_uri)
							}
							navigate(`/create/${serviceType}/${e.name}`)
						}} />
					</>
				)}
				{actions.length % 2 === 1 && <View style={{...styles.actions, borderWidth: 0}}/>}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	actionsContainer: {
		width: '100%',
		height: '80%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center'
	},
	actions: {
		width: '45%',
		height: '20%',
		borderWidth: 2,
		borderRadius: 20,
		borderColor: 'white',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '3%'
	},
	actionsText: {
		color: 'white',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 'auto',
		marginBottom: 'auto'
	}
})
