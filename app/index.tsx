import { useRouter } from 'expo-router'
import React from 'react'

const StartingPage = () => {
	const router = useRouter()

	React.useEffect(() => {
		router.push('/userAuth')
	}, [])
}

export default StartingPage