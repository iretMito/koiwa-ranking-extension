import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';


// const rows = [
//     { id: 1, name: 'John Doe', age: 24 },
//     { id: 2, name: 'Jane Doe', age: 22 },
// ];

export const Popup: React.FC = () => {
    const [rows, setRows] = useState([]);  // データを保持するためのState
    const [loading, setLoading] = useState(true);  // ローディング状態を表すState


    useEffect(() => {
        // データ取得のための関数
        const fetchData = async () => {
            const response = await fetch('https://tth4hwplwc.execute-api.ap-northeast-1.amazonaws.com/Prod/get_ranking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    exam: 'ALL',
                    start_date: '2023-01-01',
                    end_date: '2023-12-31',
                }),
            });

            // レスポンスをJSON形式で解析
            const data = await response.json();
            console.log(data)
            // データをStateにセット
            setRows(data.ranking);
            setLoading(false);  // データ取得が完了

        }

        // データ取得関数を呼び出す
        fetchData();
    }, []);

    if (loading) {  // ローディング中ならスピナーを表示
        return <CircularProgress />;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,index) => (
                        <TableRow key={index}>
                            <TableCell>{row.rank}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};