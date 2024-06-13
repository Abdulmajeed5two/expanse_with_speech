import React, { useState, useEffect } from 'react';
import { fetchExpenseData, addExpenseData } from './data';
import './Cal.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Cal = () => {
    const [data, setData] = useState({ expanse: '', catogery: '', amount: '', date: '' });
    const [expensedata, setExpansedata] = useState([]);
    const [search, setSearch] = useState('');
    const [isAddingExpense, setIsAddingExpense] = useState(false);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    
    useEffect(() => {
        setExpansedata(fetchExpenseData());
    }, []);

    useEffect(() => {
        if (transcript) {
            if (isAddingExpense) {
                handleSpeechInput(transcript);
            } else {
                setSearch(transcript);
            }
        }
    }, [transcript, isAddingExpense]);

    const handleSub = (e) => {
        e.preventDefault();
        addExpenseData(data);
        setExpansedata(fetchExpenseData());
        setData({ expanse: '', catogery: '', amount: '', date: '' });
    };

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSpeechInput = (transcript) => {
        const words = transcript.split(' ');
        const expenseData = {
            expanse: words[0] || '',
            catogery: words[1] || '',
            amount: words[2] || '',
            date: words[3] || ''
        };
        setData(expenseData);
    };

    const filteredData = expensedata.filter(item => 
        item.expanse.toLowerCase().includes(search.toLowerCase()) || 
        item.catogery.toLowerCase().includes(search.toLowerCase()) ||
        item.amount.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <p className="header">
                <p>Speech: {listening ? 'on' : 'off'}</p>
                <button className='button' onClick={() => { setIsAddingExpense(true); SpeechRecognition.startListening(); }}>Add Expense</button>
                <button className='button' onClick={() => { setIsAddingExpense(false); SpeechRecognition.startListening(); }}>Search</button>
                <button className='button' onClick={SpeechRecognition.stopListening}>Stop</button>
                <button className='button' onClick={resetTranscript}>Reset</button>
                <p>{transcript}</p>
            </p>
            <hr />
            <form onSubmit={handleSub} className="form">
                <input 
                    type='text' 
                    name='expanse'
                    placeholder='Name' 
                    value={data.expanse}
                    onChange={handleInput}
                    className="input"
                />
                <select 
                    name='catogery' 
                    value={data.catogery}
                    onChange={handleInput}
                    className="select"
                >
                    <option value="">Select Category</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Biryani">Biryani</option>
                    <option value="Transport">Transport</option>
                </select>
                <input 
                    type='number' 
                    name='amount' 
                    placeholder='Amount' 
                    value={data.amount}
                    onChange={handleInput}
                    className="input"
                />
                <input 
                    type='date' 
                    name='date'
                    value={data.date}
                    onChange={handleInput}
                    className="input"
                />
                <button type='submit' className="button">Submit</button>
            </form>
            <p>Total Amount: {expensedata.reduce((total, item) => total + parseFloat(item.amount), 0)}</p>
            <input 
                type="text" 
                placeholder="Search..." 
                value={search}
                onChange={handleSearch}
                className="searchInput"
            />
            <div className="tableContainer">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((x, index) => (
                                <tr key={index}>
                                    <td>{x.expanse}</td>
                                    <td>{x.catogery}</td>
                                    <td>{x.amount}</td>
                                    <td>{x.date}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <hr />
        </div>
    );
}

export default Cal;
