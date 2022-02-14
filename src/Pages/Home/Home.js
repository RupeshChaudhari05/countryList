import React, { useState, lazy, Suspense } from 'react';
import { Form, Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import { useSelector, useDispatch } from 'react-redux';
import DetailPage from '../../Component/Home/DetailPage';
import { selectSingleCountry, saveData } from "../../Redux/Actions/CountryAction";
import { validateFormData } from '../../Helper/index'

const List = lazy(() => import("../../Component/Home/List"));

const Home = () => {
  const defaultFormState = {
    name: '',
    rank: '',
    continent: '',
    flag: '',
    error: {
      name: '',
      rank: '',
      continent: '',
      flag: ''
    }
  }
  const [formData, setformData] = useState(defaultFormState);
  const [showDialogue, setShowDialogue] = useState(false)

  const dispatch = useDispatch();
  const state = useSelector((state) => state.countryData);

  const changData = (e) => {
    dispatch(selectSingleCountry(e.target.value))
  }

  const countrySubmit = (e) => {
    e.preventDefault();
    let error = validateFormData(formData)

    state.countryList.map((country) => {
      if (country.rank === formData.rank) {
        error.rank = "Rank already assigned, please use a different rank."
      }
      if (country.name.toLowerCase() === formData.name.toLowerCase()) {
        error.name = "Country already added."
      }
    })

    setformData({ ...formData, error })

    if (error.name === '' && error.continent === '' && error.rank === '') {
      dispatch(saveData(formData))
      setShowDialogue(false)
    }
  }

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value
    });
  }

  const handleFileUpload = (e) => {
    const { files } = e.target;
    let error = '';
    try {

      if (!files[0].name.match(/\.(jpg|png|JPG)$/)) {
        error = "Please select valid image.";
      }

      let filesize = files[0].size / 1024;
      var maxSize = '4024';

      if (filesize > maxSize) {
        error = "Over Sized image use under 4Mb.";
      }

      var reader = new FileReader();
      reader.onload = function (event) {
        let image = '';
        if (error === '') {
          image = event.target.result;
          error = '';
        } else {
          image = '';
        }
        setformData({
          ...formData,
          flag: image,
          error: {
            ...formData.error,
            flag: error
          }
        })
      };
      reader.readAsDataURL(files[0])
    } catch (e) {
      console.error("Something went wrong")
    }
  }

  var unique = [];
  state.countryList.filter(function (item) {
    var i = unique.findIndex(x => x.name === item.name);
    if (i <= -1) {
      unique.push(item);
    }
    return null;
  });

  const handleShowDialogue = () => {
    setformData(defaultFormState);
    setShowDialogue(true);
  }

  const { error } = formData;

  return <>
    <Modal
      size="lg"
      show={showDialogue}
      onHide={() => setShowDialogue(false)} >
      <Form onSubmit={countrySubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add new country
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name :</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleUserInput} className={error.name ? "is-invalid form-control" : "form-control"} />
            {error.name ? <span className="invalid-feedback">{error.name}</span> : ""}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rank :</Form.Label>
            <Form.Control type="number" placeholder="Enter rank" name="rank" onChange={handleUserInput} className={error.rank ? "is-invalid form-control" : "form-control"} />
            {error.rank ? <span className="invalid-feedback">{error.rank}</span> : ""}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Continent :</Form.Label>
            <Form.Control type="text" placeholder="Enter continent" name="continent" onChange={handleUserInput} className={error.continent ? "is-invalid form-control" : "form-control"} />
            {error.continent ? <span className="invalid-feedback">{error.continent}</span> : ""}
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Upload image (PNG, JPG)</Form.Label>
            <Form.Control type="file" name='flag' size="sm" accept=".jpg,.png" onChange={handleFileUpload} className={error.flag ? "is-invalid form-control" : "form-control"} />
            {error.flag ? <span className="invalid-feedback">{error.flag}</span> : ""}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
    <div className='row py-3'>
      <div className='col-md-8'>
        <div className='row'>
          <div className='col-sm-10'>
            <Form.Group>
              <Form.Control as="select" defaultValue={'N/A'}
                onChange=
                {changData}>
                <option value='N/A' disabled >Select a Country</option>
                {
                  unique.map((item, index) => {
                    return <option key={index} value={item.name}>{item.name}</option>
                  })
                }
              </Form.Control>
            </Form.Group>
            <DetailPage state={state}></DetailPage>
          </div>
          <div className='col-sm-2'>
            <Form.Group >
              <Button onClick={handleShowDialogue} variant="outline-primary">Add</Button>
            </Form.Group>
          </div>
        </div>
      </div>
      <div className='col-md-4'>
        <Suspense fallback={<div>Loading...</div>}>
          <List list={state.countryList}></List>
        </Suspense>
      </div>
    </div>
  </>;
};

export default Home;
