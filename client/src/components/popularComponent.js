import { useEffect, useState } from "react"
import { Container, Row, Col } from 'react-bootstrap';

export default function PopularComponent(props) {
    const { onPopularTermClick } = props;

    const [terms, setTerms] = useState([]);
    const [countdown, setCountdown] = useState(25);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPopularTerms();

        const fetchInterval = setInterval(() => {
            fetchPopularTerms();
            setCountdown(25);
        }, 25000);

        const countdownInterval = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 25));
        }, 1000);

        return () => {
            clearInterval(fetchInterval);
            clearInterval(countdownInterval);
        };
    }, []);

    const fetchPopularTerms = async () => {
        try {
            const response = await fetch('http://localhost:3001/terms/popular');
            if (!response.ok) {
                throw new Error('Failed to fetch popular terms');
            }
            const data = await response.json();
            setError(null);
            setTerms(data);
        } catch (err) {
            setError(err.message);
        }
    };


    const handlePopularClick = (item) => (event) => {
        onPopularTermClick(item);
    }

    const leftColumn = terms.slice(0, 5);
    const rightColumn = terms.slice(5, 10);


    const TermColumn = ({ terms, startIndex }) => (
        <Col xs={12} md={6} className="text-start">
            <ul className="list-unstyled">
                {terms.map((term, index) => (
                    <li
                        key={index}
                        className="clickable py-2"
                        onClick={handlePopularClick(term.word)}
                        role="button"
                        style={{ cursor: 'pointer' }}
                    >
                        <a href="#" className="text-decoration-none">
                            <strong>{(startIndex + index).toString().padStart(2, '0')}</strong>{' '}
                            <span className="text-primary">{term.word}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </Col>
    );
    return (
        <Container className="mt-3 mb-5">
            <Col className="headline">
                <h1>Popular searches</h1>
                <h4>(Next refresh: {countdown} seconds)</h4>
            </Col>
            <Col>
                {error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <Row className="justify-content-center mt-3">
                        <TermColumn terms={leftColumn} startIndex={1} />
                        <TermColumn terms={rightColumn} startIndex={6} />
                    </Row>
                )}
            </Col>
        </Container>
    )
}
