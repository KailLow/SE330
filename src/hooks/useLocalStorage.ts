import { SetStateAction, useCallback, useEffect, useState } from "react";

export default function useLocalStorage<T>(
	name: string,
	defaultValue: T
): [T | undefined, (data: T) => void, boolean] {
	const [data, _setData] = useState<T>();
	const [isSet, setIsSet] = useState(false);

	useEffect(() => {
		if (localStorage.getItem(name))
			_setData((localStorage.getItem(name) || ""));
		else _setData(defaultValue);
		setIsSet(true);
	}, [name]);

	const setData = useCallback(
		(action: T | SetStateAction<T | undefined>) => {
			_setData(action);
			if (!action) return;
			localStorage.setItem(name, JSON.stringify(action));
		},
		[name]
	);

	return [data, setData, isSet];
}