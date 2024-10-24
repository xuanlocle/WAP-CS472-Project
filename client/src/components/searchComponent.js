import { useState } from 'react';
import { Container, Col, Form, Button, ListGroup } from 'react-bootstrap';

export default function SearchComponent(props) {
    let { terms, error } = props;
    const { onSearchTerm } = props;
    const [query, setQuery] = useState();

    function handleInputChange(event) {
        const { value } = event.target;
        setQuery(value);
    }

    const handleSearchTerm = async (event) => {
        event.preventDefault();
        onSearchTerm(query)
    };

    return (
        <Container className='mt-4'>
            <Col>
                <Form onSubmit={handleSearchTerm} className="d-flex">
                    <Form.Label className="me-3 mt-2">
                        Terms:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={handleInputChange}
                    />
                    <Button type="submit" variant="primary">
                        Lookup
                    </Button>
                </Form>
            </Col>
            <div>
                {error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <div className='mt-3 mb-0'>
                        <h1>{terms[0]?.word ?? ''}</h1>
                        <ListGroup as="ol" className='mt-2 mb-3' numbered>
                            {terms.map((term) => (
                                <ListGroup.Item
                                    key={term.id}
                                    as="li">
                                    ({(term.wordtype)}) ::
                                    {term.definition}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                )}
            </div>
        </Container>
    );
}