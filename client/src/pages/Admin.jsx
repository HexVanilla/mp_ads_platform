import React, { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase'
import { getDatabase, ref, set, get, remove } from 'firebase/database'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material'

const Admin = () => {
  const [clientsDb, setClientsDb] = useState('')
  const [clientId, setClientId] = useState('')
  const [clientName, setClientName] = useState('')
  const [headerAd, setHeaderAd] = useState('')
  const [fullPageAd, setFullPageAd] = useState('')
  const [showClients, setShowClients] = useState('')
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)
  const [selectedForRemoval, setSelectedForRemoval] = useState('')
  const [showSuccessAlert, setshowSuccessAlert] = useState(false)
  const [selectedForUpload, setselectedForUpload] = useState('')

  const [triviaUpload, setTriviaUpload] = useState('')

  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app)

  //Clients
  useEffect(() => {
    fetchClients()
  }, [])

  function fetchClients() {
    get(ref(database, `clients/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setClientsDb(Object.values(snapshot.val()))
          console.log(Object.values(snapshot.val()))
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function handleShowClients() {
    fetchClients()
    setShowClients((state) => !state)
  }

  function triggerSuccessAlert(id) {
    setshowSuccessAlert(true)
    setselectedForUpload(id)
    setTimeout(() => {
      closeSuccessAlert()
    }, 2000)
  }

  function closeSuccessAlert() {
    setshowSuccessAlert(false)
    setselectedForUpload('')
  }

  function uploadClient() {
    if (
      clientId !== '' &&
      clientName !== '' &&
      headerAd !== '' &&
      fullPageAd !== ''
    ) {
      set(ref(database, 'clients/' + clientId), {
        id: clientId,
        name: clientName,
        header: headerAd,
        fullPage: fullPageAd,
      })
      triggerSuccessAlert(clientId)
      setClientId('')
      setClientName('')
      setHeaderAd('')
      setFullPageAd('')
      console.log('Client Uploaded!')
      fetchClients()
    }
  }

  function triggerDeleteWArning(e, id) {
    e.preventDefault()
    setShowDeleteWarning(true)
    setSelectedForRemoval(id)
    console.log('warning tirgger')
  }

  function removeClient() {
    if (selectedForRemoval !== '') {
      remove(ref(database, 'clients/' + selectedForRemoval))
    }
    setSelectedForRemoval('')
    console.log('Client Deleted!')
    setShowDeleteWarning(false)
    fetchClients()
  }

  //Trivia
  const handleFileChange = (event) => {
    setTriviaUpload(event.target.files[0])
  }
  async function uploadTrivia() {
    if (triviaUpload) {
      const fileReader = new FileReader()

      fileReader.onload = async (event) => {
        try {
          const questionsObject = JSON.parse(event.target.result)
          await set(ref(database, 'questions/'), questionsObject)
          alert('Upload successful!')
        } catch (error) {
          console.error('Failed to upload:', error)
        }
      }

      fileReader.readAsText(triviaUpload)
    } else {
      alert('Please select a file before uploading.')
    }
  }

  async function downloadTrivia() {
    try {
      const snapshot = await get(ref(database, 'questions/'))
      if (snapshot.exists()) {
        const questionsObject = snapshot.val()
        const dataStr =
          'data:text/json;charset=utf-8,' +
          encodeURIComponent(JSON.stringify(questionsObject))
        const downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute('href', dataStr)
        downloadAnchorNode.setAttribute('download', 'questions.json')
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
      } else {
        alert('No questions available for download.')
      }
    } catch (error) {
      console.error('Failed to download:', error)
    }
  }

  return (
    <div>
      <Typography variant="h1">Admin Panel</Typography>
      {showDeleteWarning ? (
        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small" onClick={removeClient}>
              Ok
            </Button>
          }
        >
          {`Estas apunto de borrar a ${selectedForRemoval}`}
        </Alert>
      ) : (
        ''
      )}
      {showSuccessAlert ? (
        <Alert severity="success" onClose={() => {}}>
          {`Agregaste exitosamente a ${selectedForUpload}`}
        </Alert>
      ) : (
        ''
      )}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Client List
          </Typography>
          <Button onClick={handleShowClients}>Show Current Clients</Button>
          {showClients
            ? clientsDb?.map((client) => (
                <Card sx={{ width: 'fit-content' }}>
                  <CardContent>
                    <Typography variant="overline">Id</Typography>
                    <Typography variant="subtitle2">{client.id}</Typography>
                    <Typography variant="overline">Name</Typography>
                    <Typography variant="subtitle2">{client.name}</Typography>
                    <Typography variant="overline">Header</Typography>
                    <Typography variant="subtitle2">{client.header}</Typography>
                    <Typography variant="overline">FullPage</Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      {client.fullPage}
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => triggerDeleteWArning(e, client.id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))
            : ''}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Update Client List
          </Typography>
          <TextField
            id="id"
            label="Id"
            variant="outlined"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <TextField
            id="header-ad"
            label="Header Ad"
            variant="outlined"
            value={headerAd}
            onChange={(e) => setHeaderAd(e.target.value)}
          />
          <TextField
            id="fullpage-ad"
            label="Fullpage Ad"
            variant="outlined"
            value={fullPageAd}
            onChange={(e) => setFullPageAd(e.target.value)}
          />
        </CardContent>
        <CardContent>
          <Button variant="contained" color="success" onClick={uploadClient}>
            Upload
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Update Trivia Questions
          </Typography>
          <input type="file" onChange={handleFileChange} />
          <Button variant="contained" color="success" onClick={uploadTrivia}>
            Upload
          </Button>
          <Button variant="contained" onClick={downloadTrivia}>
            Download
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Admin
