export default function Home() {
  return (
    <main style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      color: '#fff',
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 300, letterSpacing: '0.1em' }}>
        TokToyIA
      </h1>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.5 }}>
        Em breve
      </p>
    </main>
  )
}
