import React, {useEffect, useState} from 'react'
import Card from "../../../../components/Card";
import {Button, TextField, Typography} from "@mui/material";
import {getScore} from "../../../../api/scoreApi";

const coreSubjects = [
    { label: 'Math', key: 'toan' },
    { label: 'Literature', key: 'nguVan' },
    { label: 'Foreign Language', key: 'ngoaiNgu' },
];

const naturalGroup = [
    { label: 'Physics', key: 'vatLi' },
    { label: 'Chemistry', key: 'hoaHoc' },
    { label: 'Biology', key: 'sinhHoc' },
];

const socialGroup = [
    { label: 'History', key: 'lichSu' },
    { label: 'Geography', key: 'diaLi' },
    { label: 'Civic Education', key: 'gdcd' },
];
const SearchScore = () => {
    const [regNumber, setRegNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [score, setScore] = useState(null);
    const [groupSubjects, setGroupSubjects] = useState([]);

    useEffect(() => {
        const hasNatural = score!==null && naturalGroup.some(({ key }) => score?.[key] !== null);
        const hasSocial = score!==null && socialGroup.some(({ key }) => score?.[key] !== null);
        console.log(hasNatural, hasSocial)
        if (hasNatural) setGroupSubjects([...coreSubjects, ...naturalGroup, { label: 'Foreign Language Code', key: 'maNgoaiNgu' }]);
        else if (hasSocial) setGroupSubjects([...coreSubjects, ...socialGroup, { label: 'Foreign Language Code', key: 'maNgoaiNgu' }]);
        else setGroupSubjects([]);
    }, [score]);

    const handleSubmit = async () => {
        if (!regNumber.trim()) {
            setError('Registration number is required!');
        } else {
            setLoading(true)
            setError('');
            try {
                const response = await getScore(regNumber);
                setScore(response?.data);
            } catch (e) {
                setError(e.response?.data?.desc);
                setScore(null);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Card
            style={{
                width: "97.5%",
                minHeight: "10rem"
            }}
        >
            <div style={{display: "flex", flexDirection: "row", gap: "1rem"}}>
                <TextField
                    label="Registration Number"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    style={{width: "40%"}}
                />
                <Button variant="contained" onClick={handleSubmit}
                    loading={loading}
                    style={{width: "8rem",
                        backgroundColor: "black"
                    }}
                >
                    Submit
                </Button>
            </div>
            {error && (
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
            )}

            {score && (
                <div style={{ marginTop: '2rem' }}>
                    <Typography variant="h6">Result:</Typography>
                    <ul>
                        {groupSubjects.map(({ label, key }) => (
                            <li key={key}>
                                <strong>{label}:</strong>{' '}
                                {score[key] != null ? score[key] : 'No result'}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Card>
    )
}

export default SearchScore;