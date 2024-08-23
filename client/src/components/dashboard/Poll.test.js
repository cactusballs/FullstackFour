import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Poll from './Poll';
import { BsChatLeftHeart } from 'react-icons/bs';

jest.mock('axios');
jest.mock('./Card', () => ({ title, content, cardFooterButton, cardFooter }) => (
    <div>
        <div>{title}</div>
        <div>{content}</div>
        <div>{cardFooterButton && <button>{cardFooterButton}</button>}</div>
        <div>{cardFooter}</div>
    </div>
));


test('fetches and displays poll data', async () => {
    const pollData = {
        poll: { id: 1, title: 'Are you seeing this?' },
        options: [
            { id: 1, label: 'Yes', "COUNT(poll_votes.poll_options_id)": 6 },
            { id: 2, label: 'No', "COUNT(poll_votes.poll_options_id)": 1 }
        ]
    };
    axios.get.mockResolvedValueOnce({ data: pollData });

    render(<Poll pollId={1} />);

    await waitFor(() => expect(screen.getByText('Are you seeing this?')).toBeInTheDocument());
    expect(screen.getByLabelText('Yes')).toBeInTheDocument();
    expect(screen.getByLabelText('No')).toBeInTheDocument();
});
