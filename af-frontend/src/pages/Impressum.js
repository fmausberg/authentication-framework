// src/pages/Impressum.js
import React from 'react';

function Impressum() {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}><strong>Impressum</strong></h1>
            <p style={{ textAlign: 'center' }}>Felix Paul Mausberg</p>
            <p style={{ textAlign: 'center' }}>Breite Straße 33a | 41460 Neuss | Germany</p>
            <p style={{ textAlign: 'center' }}>
                <a href="mailto:felix@mausberg.net">felix@mausberg.net</a> | +49 152 21886204
            </p>
        </div>
    );
}

export default Impressum;
