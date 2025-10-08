'use client';

export function Hero() {
  return (
    <section style={{
      padding: '120px 0',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'rgb(255, 255, 255)'
    }}>
      <div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '0 20px',
        width: '100%'
      }}>
        <div style={{ marginBottom: '40px' }}>
          
          {/* Hero Badge */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '24px' 
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              padding: '8px 16px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#10b981',
                borderRadius: '50%'
              }}></div>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#64748b'
              }}>Invisible AI That Thinks for You</span>
            </div>
          </div>
          
          {/* Main Hero Heading - MASSIVE TEXT */}
          <h1 style={{
            fontSize: '96px',
            fontWeight: '400',
            lineHeight: '120px',
            fontFamily: 'Inter, "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
            color: 'rgb(0, 0, 0)',
            letterSpacing: 'normal',
            margin: '0 auto 24px auto',
            maxWidth: '896px'
          }}>
            <span style={{ display: 'block' }}>Invisible AI That</span>
            <span style={{ display: 'block' }}>Thinks for You</span>
          </h1>
          
          {/* Hero Description */}
          <p style={{
            fontSize: '24px',
            fontWeight: '500',
            lineHeight: '33px',
            fontFamily: 'Inter, "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
            color: 'rgb(0, 0, 0)',
            maxWidth: '672px',
            margin: '0 auto 32px auto'
          }}>
            Cluely is an undetectable desktop app that gives you the answers you didn't study for in every meeting and conversation.
          </p>
          
          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '64px'
          }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Inter, "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                textDecoration: 'none',
                padding: '12px 15px',
                background: '#16222F',
                color: 'hsl(0, 0%, 98%)'
              }}>
                Get for Mac
              </button>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Inter, "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                textDecoration: 'none',
                padding: '12px 15px',
                background: 'hsl(240, 4.8%, 95.9%)',
                color: 'hsl(240, 5.9%, 10%)'
              }}>
                Get for Windows
              </button>
            </div>
          </div>
          
          {/* Product Demo Area - Like Cluely */}
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              background: '#f1f5f9',
              borderRadius: '32px',
              padding: '64px 32px',
              minHeight: '600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center', maxWidth: '800px' }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎯</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '24px',
                  fontFamily: 'Inter, "Inter Fallback", ui-sans-serif, system-ui, sans-serif'
                }}>AI second brain for every meeting</h3>
                <h2 style={{
                  fontSize: '48px',
                  fontWeight: '400',
                  lineHeight: '56px',
                  fontFamily: 'Inter, "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
                  color: 'rgb(0, 0, 0)',
                  marginBottom: '32px'
                }}>
                  <span style={{ display: 'block' }}>Thinking is the slowest thing you do.</span>
                  <span style={{ display: 'block' }}>Let AI do it for you instead.</span>
                </h2>
                
                {/* Feature Tabs */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'white',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      background: '#16222F',
                      borderRadius: '4px'
                    }}></div>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1f2937'
                    }}>Live insights</span>
                  </button>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'white',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      background: '#10b981',
                      borderRadius: '4px'
                    }}></div>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1f2937'
                    }}>Instant answers</span>
                  </button>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'white',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      background: '#8b5cf6',
                      borderRadius: '4px'
                    }}></div>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1f2937'
                    }}>Knowledge search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}