import React, {useEffect, useState} from 'react'
import Card from "../../../../components/Card";
import {getScoreStatistics} from "../../../../api/scoreApi";
import SubjectPieChart from "./component/SubjectPieChart";
import {CircularProgress} from "@mui/material";

const Report = () => {
    const [stat, setStat] = useState();
    const [loading, setLoading] = useState(false);
    const handleLoadData = async () => {
        try {
            setLoading(true);
            const response = await getScoreStatistics();
            console.log(response?.data?.subjectStatistics)
            setStat(response?.data?.subjectStatistics);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleLoadData();
    }, []);

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Score Statistics By Subject</h2>
            {loading &&
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
                    <CircularProgress />
                </div>
            }
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: "center", justifyContent: "center" }}>
                {stat && Object.entries(stat).map(([subject, data]) => (
                    <Card>
                        <SubjectPieChart key={subject} subjectName={subject} data={data} />
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Report;