import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const StartingPage = () => {
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isMounted) {
			router.push('/userAuth');
		}
	}, [isMounted]);

	return null;
};

export default StartingPage;