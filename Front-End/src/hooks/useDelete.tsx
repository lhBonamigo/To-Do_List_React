import { useEffect, useState } from 'react'
import { IHead } from '../Interfaces/Interfaces';

export function useDelete(url: string) {
    const [dataDel, setData] = useState(null);
    const [options, setOptions] = useState<IHead | null>(null);
    const [trigger, setTrigger] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const httpConfigDel = () => {
        setOptions({
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });
        setTrigger(true); // Dispara a requisição
    };

    useEffect(() => {
        const httpRequest = async () => {
            if (!options || !trigger) return;

            try {
                const res = await fetch(url, options);
                if (!res.ok) throw new Error(`Erro: ${res.status}`);
                const json = await res.json();
                setData(json);
                setError(null);
            } catch (err: any) {
                setError(err.message);
                setData(null);
            } finally {
                setTrigger(false); // Resetar o trigger
            }
        };

        httpRequest();
    }, [options, trigger, url]);

    return { dataDel, httpConfigDel, error };
}

export default useDelete;