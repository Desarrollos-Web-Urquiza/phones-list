import { useState } from 'react'
import { validateRange, generateSequence } from '../lib/utils'
import { useAlert } from './Alert'
import { addSequence as addSequenceFirebase,} from '../firebase/functions'
import useSequences from '../lib/useSequences'
import { useRouter } from 'next/router'

export default function setNumbersRange({onSequenceCreated, children}) {

  const { addSequence } = useSequences()
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [generating, setGenerating] = useState(false)
  const [invalidRange, setInvalidRange] = useState(false)
  const router = useRouter()
  
  const createSequence = async () => {
    setGenerating(true)
    try {
      validateRange(from, to)
      const numbersArr = generateSequence(from, to)
      const sequenceId = await addSequenceFirebase(numbersArr, {from, to})
      addSequence(sequenceId, { range: { from, to }})
      router.push(`/${sequenceId}`)
      onSequenceCreated && onSequenceCreated(sequenceId)
    } catch(err) {
      err.message && setInvalidRange(err.message)
    } finally {
      setGenerating(false)
    }
  }

  const handleSubmit = e => e.preventDefault()

  const range = {
    from: {
      setter: setFrom,
      placeholder: 'Número inicial',
      value: from,
    },
    to: {
      setter: setTo,
      placeholder: 'Número final',
      value: to,
    }
  }

  const mapInputs = prop => {
    const { setter, placeholder, value } = range[prop]
    return (
      <div key={prop} className="mb-3">
        <input
          className="form-control"
          onChange={e => {
            setInvalidRange(false)
            setter(Number(e.target.value))
          }}
          invalid={invalidRange ? 'true' : 'false'}
          placeholder={placeholder}
          defaultValue={value}
          type="number"
          min="0"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div> 
    )
  }

  const saveButton = (
    <button
      disabled={generating}
      type="submit"
      className="btn btn-primary"
      onClick={createSequence}
      tabIndex="3"
    >
      {generating ? 'Generando números...' : 'Crear secuencia'}
    </button>
  )

  const invalidMessage = invalidRange && (
    <div className="text-red-500">
      {invalidRange}
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(range).map(mapInputs)}
      {invalidMessage}
      {typeof children == 'function' ? (
        children(saveButton)
      ) : (
        <div className="mt-4">
          {saveButton}
        </div>
      )}
    </form>
  )
}