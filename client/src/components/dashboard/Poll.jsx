import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Poll.css"

function Poll({ pollId }) {
    const [poll, setPoll] = useState(null);
    const [votes, setVotes] = useState([]);
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        // Fetch poll data
        axios.get(`http://localhost:3000/poll/${pollId}`)
            .then(response => {
                setPoll(response.data.poll);
                setVotes(response.data.options.map(option => ({ ...option, votes: 0 })));
            })
            .catch(error => console.error('Error fetching poll data:', error));
    }, [pollId]);

    useEffect(() => {
        // Fetch poll results
        if (voted) {
            axios.get(`http://localhost:3000/poll/${pollId}/results`)
                .then(response => {
                    setVotes(votes.map(option => ({
                        ...option,
                        votes: response.data.find(res => res.label === option.label)?.votes || 0
                    })));
                })
                .catch(error => console.error('Error fetching poll results:', error));
        }
    }, [voted, pollId, votes]);

    const handleVote = (optionId) => {
        if (!voted) {
            axios.post(`http://localhost:3000/poll/${pollId}/vote`, { pollId, optionId })
                .then(() => {
                    setVoted(true);
                })
                .catch(error => console.error('Error submitting vote:', error));
        }
    };

    if (!poll) return <div>Loading...</div>;

    return (
        <div>
            <h2>{poll.title}</h2>
            <ul>
                {votes.map((option, index) => (
                    <li key={index}>
                        <button onClick={() => handleVote(option.id)} disabled={voted}>
                            {option.label}
                        </button>
                        {voted && (
                            <div>
                                <div style={{ width: '200px', backgroundColor: '#ddd', marginTop: '10px' }}>
                                    <div
                                        style={{
                                            width: `${(option.votes / votes.reduce((acc, opt) => acc + opt.votes, 0)) * 100}%`,
                                            backgroundColor: '#4caf50',
                                            height: '10px'
                                        }}
                                    ></div>
                                </div>
                                <span>{option.votes} votes</span>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default Poll;
