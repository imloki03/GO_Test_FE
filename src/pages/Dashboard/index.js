import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from "../../components/Card";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Box,
    Typography, CircularProgress,
} from "@mui/material";
import { getTop10ByGroup } from "../../api/scoreApi";

const allColumns = [
    { field: 'id', headerName: 'Student ID', flex: 1 },
    { field: 'math', headerName: 'Math', type: 'number', flex: 1 },
    { field: 'literature', headerName: 'Literature', type: 'number', flex: 1 },
    { field: 'foreign_language', headerName: 'Foreign Language', type: 'number', flex: 1 },
    { field: 'physics', headerName: 'Physics', type: 'number', flex: 1 },
    { field: 'chemistry', headerName: 'Chemistry', type: 'number', flex: 1 },
    { field: 'biology', headerName: 'Biology', type: 'number', flex: 1 },
    { field: 'history', headerName: 'History', type: 'number', flex: 1 },
    { field: 'geography', headerName: 'Geography', type: 'number', flex: 1 },
    { field: 'civic_edu', headerName: 'Civic Education', type: 'number', flex: 1 },
    { field: 'language_code', headerName: 'Language Code', flex: 1 },
    { field: 'total_score', headerName: 'Total Score', flex: 1 },
];

const subjectGroups = {
    A: ['math', 'physics', 'chemistry'],
    B: ['math', 'biology', 'chemistry'],
    C: ['literature', 'history', 'geography'],
    D: ['math', 'literature', 'foreign_language'],
};

const Dashboard = () => {
    const [filteredRows, setFilteredRows] = useState([]);
    const [filteredColumns, setFilteredColumns] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('A');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getTop10ByGroup(selectedGroup);
                const rawData = res.data || [];

                const subjectMap = {
                    toan: 'math',
                    ngu_van: 'literature',
                    ngoai_ngu: 'foreign_language',
                    vat_li: 'physics',
                    hoa_hoc: 'chemistry',
                    sinh_hoc: 'biology',
                    lich_su: 'history',
                    dia_li: 'geography',
                    gdcd: 'civic_edu',
                };

                const mappedRows = rawData.map((student) => {
                    const subjectScores = student.subjectScores || {};
                    const row = {
                        id: student.sbd,
                        total_score: student.totalScore,
                    };

                    Object.entries(subjectScores).forEach(([vnKey, value]) => {
                        const enKey = subjectMap[vnKey];
                        if (enKey) row[enKey] = value;
                    });

                    return row;
                });

                const groupSubjects = subjectGroups[selectedGroup] || [];
                const columnsToShow = [
                    { field: 'id', headerName: 'Student ID', flex: 1 },
                    ...allColumns.filter(col =>
                        groupSubjects.includes(col.field)
                    ),
                    { field: 'total_score', headerName: 'Total Score', flex: 1 },
                ];

                setFilteredColumns(columnsToShow);
                setFilteredRows(mappedRows);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedGroup]);

    const handleChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    return (
        <Card>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">
                    Top 10 Students by Exam Group
                </Typography>
                <FormControl sx={{ width: 380 }}>
                    <InputLabel>Exam Group</InputLabel>
                    <Select value={selectedGroup} label="Exam Group" onChange={handleChange}>
                        <MenuItem value="A">A (Math, Physics, Chemistry)</MenuItem>
                        <MenuItem value="B">B (Math, Biology, Chemistry)</MenuItem>
                        <MenuItem value="C">C (Literature, History, Geography)</MenuItem>
                        <MenuItem value="D">D (Math, Literature, Foreign Language)</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {loading &&
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <CircularProgress />
                </div>
            }
            {
                !loading &&
                <DataGrid
                    rows={filteredRows}
                    columns={filteredColumns}
                    disableSelectionOnClick
                    hideFooterPagination={true}
                />
            }
        </Card>
    );
};

export default Dashboard;
