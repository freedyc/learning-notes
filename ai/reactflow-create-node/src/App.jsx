import './App.css'
import SelectionGrouping from './SelectionGrouping'
import { ReactFlowProvider } from 'reactflow'

function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
        <SelectionGrouping />
      </ReactFlowProvider>
    </div>
  )
}

export default App
