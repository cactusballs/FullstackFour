import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Poll.css";
import { BsChatLeftHeart } from "react-icons/bs";

const Poll = ({ pollId }) => {
  const [poll, setPoll] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/pollInfo/${pollId}`
        );
        setPoll(response.data.poll);
        setOptions(response.data.options || []);
      } catch (err) {
        setError("Failed to fetch poll data");
      }
    };

    fetchPoll();
  }, [pollId]);

  const handleVote = async () => {
    if (!selectedOption) {
      setError("Please select an option");
      return;
    }

    try {
      const voteResponse = await axios.post("http://localhost:3000/pollVote", {
        poll_id: poll.id,
        poll_options_id: selectedOption,
      });

      if (voteResponse.status === 201) {
        setMessage("Vote successful");
        fetchResults();
      } else {
        setError("Your vote was not recorded, please try again");
      }
    } catch (err) {
      setError("Unable to submit vote, please try again");
    }
  };

  const fetchResults = async () => {
    try {
      const resultsResponse = await axios.get(
        `http://localhost:3000/pollResults/${pollId}`
      );
      setOptions(resultsResponse.data.optionsVotes || []);
    } catch (err) {
      setError("Failed to fetch poll results");
    }
  };

  const renderOptions = () => {
    if (!options || options.length === 0) {
      return <div>No options available</div>;
    }

    return options.map((option) => (
      <div key={option.id || option.label} className="poll-option">
        <input
          type="radio"
          id={option.id || option.label}
          name="poll"
          value={option.id}
          onChange={() => setSelectedOption(option.id)}
          disabled={!!option.percentage}
        />
        <label htmlFor={option.id || option.label}>
          {option.label}
          {option.percentage !== undefined &&
            ` - ${option["COUNT(poll_votes.poll_options_id)"]} votes (${option.percentage}%)`}
        </label>
      </div>
    ));
  };

  return (
    <div className="poll-card">
      <div className="poll-header">
        <div className="poll-title">
          <BsChatLeftHeart className="poll-title-icon" />
          <h4>Village Poll</h4>
          <BsChatLeftHeart className="poll-title-right-icon" />
        </div>
      </div>
      <div className="poll-content">
        {poll && <div className="poll-question">{poll.title}</div>}
        {error && <div className="poll-error">{error}</div>}
        {message && <div className="poll-message">{message}</div>}
        {renderOptions()}
      </div>
      <div className="poll-footer">
        {!options[0]?.percentage ? (
          <button className="poll-footer-button" onClick={handleVote}>
            Vote
          </button>
        ) : (
          <div className="poll-footer-text">
            Total Votes:{" "}
            {options.reduce(
              (acc, option) =>
                acc + option["COUNT(poll_votes.poll_options_id)"],
              0
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Poll;
