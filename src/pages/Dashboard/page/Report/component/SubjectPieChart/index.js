import { ResponsivePie } from '@nivo/pie';

const subjectNameMap = {
    nguVan: 'Literature',
    hoaHoc: 'Chemistry',
    lichSu: 'History',
    ngoaiNgu: 'Foreign Language',
    vatLi: 'Physics',
    sinhHoc: 'Biology',
    diaLi: 'Geography',
    toan: 'Mathematics',
    gdcd: 'Civic Education',
};

const gradeLabels = {
    above8: '>= 8',
    from6To8: '6 - 8',
    from4To6: '4 - 6',
    below4: '< 4'
};

const nivoSchemes = [
    'nivo',
    'category10',
    'accent',
    'dark2',
    'paired',
    'pastel1',
    'pastel2',
    'set1',
    'set2',
    'set3',
];

const SubjectPieChart = ({ subjectName, data }) => {
    const randomScheme = nivoSchemes[Math.floor(Math.random() * nivoSchemes.length)];

    const chartData = Object.entries(data).map(([key, value]) => ({
        id: gradeLabels[key] || key,
        label: gradeLabels[key] || key,
        value,
    }));

    return (
        <div style={{ width: "30rem", height: "25rem" }}>
            <h3 style={{ textAlign: 'center', margin: 0, padding: 0 }}>{subjectNameMap[subjectName] || subjectName}</h3>
            <ResponsivePie
                data={chartData}
                margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                colors={{ scheme: randomScheme }}
                enableArcLinkLabels={false}
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        translateX: 80,
                        itemWidth: 100,
                        itemHeight: 28,
                        symbolSize: 18,
                    },
                ]}
            />
        </div>
    );
};

export default SubjectPieChart;