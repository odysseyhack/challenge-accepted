import React, { Component, useCallback } from 'react';
import Dropzone, {useDropzone} from 'react-dropzone'
import { Container, Header, Form, Checkbox, Button, TextArea } from 'semantic-ui-react';
import { uploadFile, createContract } from '../../ApiClient';
import {authContext, getAuthToken} from '../../adalConfig'

function mapStateToProps(state: any) {
    return {

    };
}

class ContractForm extends Component<any, any> {
    upload; name; budget; description;
    reader = new FileReader()

    constructor(props) {
        super(props);
        this.upload = React.createRef();
        this.name = React.createRef();
        this.budget = React.createRef();
        this.description = React.createRef();

        this.reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = this.reader.result
            this.setState({
                sFile: binaryStr
            })
          }
      }

    createContract = () => {
        let token = getAuthToken();
        console.log('Going to create a new one', token, authContext);
        uploadFile(this.state.fileName, this.state.sFile).then((result: any)=>{
            result.json().then((body) => {
                console.log('BODY', body);
                if (result.status === 201) {
                    console.log('FILE UPLOADED', this.state.fileName, body);

                    createContract({
                        fileName: body.fileName,
                        fileHash: body.fileHash,
                        budget: 69,
                        description: 'Challenge Accepted',
                        token: token
                    });
                }
            });            
        })
    }
    render() {
        return (
            <Container text className="body">
            <h1>CREATE A CONTRACT</h1>
                <Form>
                    <Form.Field>
                        <label>File</label>
                        <Dropzone onDrop={(acceptedFiles) => {
                            
                            if(acceptedFiles && acceptedFiles[0]) {
                                acceptedFiles.forEach(file => {
                                    this.reader.readAsBinaryString(file)                                    
                                })                                

                                this.setState({
                                    fileName: acceptedFiles[0].name,
                                    file: acceptedFiles[0],
                                });
                                this.name.current.value = acceptedFiles[0].name;
                            }
                        }}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            </section>
                        )}
                        </Dropzone>
                    </Form.Field>
                    <Form.Field>
                        <label>File name</label>
                        <input placeholder='File name' ref={this.name} disabled />
                    </Form.Field>
                    <Form.Field>
                        <label>Budget</label>
                        <input placeholder='Budget' defaultValue="0" />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <TextArea placeholder='Description' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button type='button' onClick={this.createContract}>Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default ContractForm;