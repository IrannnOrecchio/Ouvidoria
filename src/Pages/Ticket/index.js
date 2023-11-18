import React, { useCallback, useState } from 'react';


import { useDropzone } from 'react-dropzone';
import './ticket.css';

function Ticket() {
    const [files, setFiles] = useState([]);
    const [displayOverlay, setDisplayOverlay] = useState(true);
    const[titulo, setTitulo] = useState ('')
    const [descrição, setDescrição] = useState ('')

    const onDrop = useCallback(acceptedFiles => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*,video/*' // Aceita tanto imagens quanto vídeos
    });

    const closeOverlay = () => {
        setDisplayOverlay(false);
    };

    return (
        <div className='ticket-container'>
            {displayOverlay && (
                <div className='overlay'>
                    <div className='overlay-content'>
                        <p>Sinta-se seguro ao fazer sua denúncia, você está totalmente anônimo e protegido.</p>
                        <button onClick={closeOverlay} className='close-button'>X</button>
                    </div>
                </div>
            )}

            <form className='formulario-ticket'>

                <h1>Formulário de denúncia</h1>

                <input
                value={titulo}
                onChange={(e)=> setTitulo(e.target.value)}
                className='input_titulo' type='text' placeholder='Digite o título da sua denúncia' />

                <textarea
                value={descrição}
                onChange={(e)=> setDescrição(e.target.value)}
                className='input_descricao' placeholder='Digite aqui a descrição da sua denúncia'></textarea>

                <div {...getRootProps()} className='dropzone'>

                    <input {...getInputProps()} />
                    {files.length === 0 ? (
                        <p>Arraste e solte os arquivos, ou clique para selecionar</p>
                    ) : null}
                    <aside className="thumbs-container">
                        {files.map(file => (
                            <div key={file.name}>
                                {file.type.startsWith('image/') ? (
                                    <img src={file.preview} alt={file.name} className="image-preview" />
                                ) : (
                                    <video src={file.preview} className="video-preview" controls />
                                )}
                            </div>
                        ))}
                    </aside>
                </div>
                <button className='botao-submit' type='submit'>Enviar</button>
            </form>
        </div>
    );
}

export default Ticket;