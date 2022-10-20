import './home.css'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate, useLocation } from "react-router-dom";


function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    fetch('https://api.coinpaprika.com/v1/coins')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }
  const PER_PAGE = 50;
  const offset = currentPage * PER_PAGE;
  const currentPageData = data
      .slice(offset, offset + PER_PAGE)
      .map((item) => item);
  const pageCount = Math.ceil(data.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  function redirect(id) {
    console.log('test', id)
    navigate(`/coin/${id}`)
  }
  return (
    <div>
      <header>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Coin List</Nav.Link>
        </Nav.Item>
      </Nav>
      </header>
      <section>
        <div style={{backgroundColor: 'white', margin: '100px', textAlign: 'left', padding: '30px'}}>
          <h2 style={{margin: '10px'}}>Coin List</h2>
          <div style={{display: 'flex'}}>
            <div style={{margin: '10px'}}>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  Select
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div style={{margin: '10px'}}>
              <Form>
                <Form.Control type='text' placeholder='Search'/>
              </Form>
            </div>
            <div style={{margin: '10px'}}>
              <Button>Search</Button>
            </div>
          </div>
          <div className='tableSec'>
              <table>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Rank</th>
                      <th>Type</th>
                      <th>Active</th>
                      <th>Action</th>
                  </tr>
                  {currentPageData.map((post) => {
                    return (
                      <tr onClick={() => redirect(post.id)} className="post-card" key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.name}</td>
                        <td>{post.symbol}</td>
                        <td>{post.rank}</td>
                        <td>{post.type}</td>
                        <td>{post.is_active}</td>
                        <td>
                          <Button variant='danger'>Delete</Button>
                        </td>
                      </tr>
                    )
                  })}
              </table>
          </div>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
          </div>
      </section>
    </div>
  );
}

export default App;
