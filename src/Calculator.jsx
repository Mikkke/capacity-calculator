import { useState } from 'react'
import './App.css'

function Calculator() {
    const [prixBien, setPrixBien] = useState('')
    const [tauxInteret, setTauxInteret] = useState('')
    const [nbMois, setNbMois] = useState(300)
    const [apport, setApport] = useState('')
    const [ptz, setPtz] = useState('')
    const [pret1Pourcent, setPret1Pourcent] = useState('')
    const [taxeFonciere, setTaxeFonciere] = useState('')
    const [chargesAnnuelles, setChargesAnnuelles] = useState('')
    const [assurancePret, setAssurancePret] = useState('')

    // Calcul de la mensualité du prêt principal
    const calculerMensualite = (capital, tauxAnnuel, duree) => {
        if (!capital || !tauxAnnuel || !duree) return 0
        const tauxMensuel = tauxAnnuel / 100 / 12
        if (tauxMensuel === 0) return capital / duree
        return (capital * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -duree))
    }

    const capitalEmprunte = parseFloat(prixBien || 0) - parseFloat(apport || 0) - parseFloat(ptz || 0) - parseFloat(pret1Pourcent || 0)
    const mensualitePretPrincipal = calculerMensualite(capitalEmprunte, parseFloat(tauxInteret || 0), parseInt(nbMois || 300))

    const mensualiteTaxeFonciere = parseFloat(taxeFonciere || 0) / 12
    const mensualiteCharges = parseFloat(chargesAnnuelles || 0) / 12
    const mensualiteAssurance = parseFloat(assurancePret || 0)

    const mensualiteTotale = mensualitePretPrincipal + mensualiteTaxeFonciere + mensualiteCharges + mensualiteAssurance

    return (
        <div className="app">
            <h1>Calculateur de Mensualités Immobilières</h1>

            <div className="container">
                <div className="form-section">
                    <h2>Informations du prêt</h2>

                    <div className="input-group">
                        <label>Prix du bien (€)</label>
                        <input
                            type="number"
                            value={prixBien}
                            onChange={(e) => setPrixBien(e.target.value)}
                            placeholder="250000"
                        />
                    </div>

                    <div className="input-group">
                        <label>Apport (€)</label>
                        <input
                            type="number"
                            value={apport}
                            onChange={(e) => setApport(e.target.value)}
                            placeholder="50000"
                        />
                    </div>

                    <div className="input-group">
                        <label>Taux d'intérêt (%)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={tauxInteret}
                            onChange={(e) => setTauxInteret(e.target.value)}
                            placeholder="3.5"
                        />
                    </div>

                    <div className="input-group">
                        <label>Durée du prêt (mois)</label>
                        <input
                            type="number"
                            value={nbMois}
                            onChange={(e) => setNbMois(e.target.value)}
                            placeholder="300"
                        />
                    </div>

                    <h3>Prêts annexes (optionnel)</h3>

                    <div className="input-group">
                        <label>PTZ (€)</label>
                        <input
                            type="number"
                            value={ptz}
                            onChange={(e) => setPtz(e.target.value)}
                            placeholder="0"
                        />
                    </div>

                    <div className="input-group">
                        <label>Prêt à 1% (€)</label>
                        <input
                            type="number"
                            value={pret1Pourcent}
                            onChange={(e) => setPret1Pourcent(e.target.value)}
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Charges mensuelles</h2>

                    <div className="input-group">
                        <label>Taxe foncière annuelle (€)</label>
                        <input
                            type="number"
                            value={taxeFonciere}
                            onChange={(e) => setTaxeFonciere(e.target.value)}
                            placeholder="1200"
                        />
                    </div>

                    <div className="input-group">
                        <label>Charges annuelles (€)</label>
                        <input
                            type="number"
                            value={chargesAnnuelles}
                            onChange={(e) => setChargesAnnuelles(e.target.value)}
                            placeholder="2400"
                        />
                    </div>

                    <div className="input-group">
                        <label>Assurance de prêt mensuelle (€)</label>
                        <input
                            type="number"
                            value={assurancePret}
                            onChange={(e) => setAssurancePret(e.target.value)}
                            placeholder="50"
                        />
                    </div>
                </div>
            </div>

            <div className="results">
                <h2>Résultat</h2>
                <div className="result-details">
                    <div className="result-line">
                        <span>Capital emprunté :</span>
                        <span className="amount">{capitalEmprunte.toFixed(2)} €</span>
                    </div>
                    <div className="result-line">
                        <span>Mensualité prêt :</span>
                        <span className="amount">{mensualitePretPrincipal.toFixed(2)} €</span>
                    </div>
                    <div className="result-line">
                        <span>Taxe foncière /mois :</span>
                        <span className="amount">{mensualiteTaxeFonciere.toFixed(2)} €</span>
                    </div>
                    <div className="result-line">
                        <span>Charges /mois :</span>
                        <span className="amount">{mensualiteCharges.toFixed(2)} €</span>
                    </div>
                    <div className="result-line">
                        <span>Assurance /mois :</span>
                        <span className="amount">{mensualiteAssurance.toFixed(2)} €</span>
                    </div>
                </div>
                <div className="total">
                    <span>MENSUALITÉ TOTALE :</span>
                    <span className="total-amount">{mensualiteTotale.toFixed(2)} €</span>
                </div>
            </div>
        </div>
    )
}

export default Calculator
