import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
const loggedIn = false
const organisation = 'org'
const gender: 'm'|'f' = 'm'
const orgtype: 'mission'|'church'|'education'|'business'|'non-profit'|'other' = 'mission'
const accommodation = 1
const acc = [
  {
    id: 1,
    label: 'BTL Dual occupancy',
    description: 'Conference attendance including full board in a double bedroom for 3 nights',
    cost: 22000,
    currency: 'KSh',
  },
  {
    id: 2,
    label: 'BTL Single occupancy',
    description: 'Conference attendance including full board in a single bedroom for 3 nights',
    cost: 27000,
    currency: 'KSh',
  },
  {
    id: 3,
    label: 'BTL Single occupancy with dual occupancy voucher from previous conference',
    description: 'Conference attendance including full board in a single bedroom for 3 nights',
    cost: 5000,
    currency: 'KSh',
  }
]
const products = [
  {
    id: 1,
    label: 'Taxi',
    description: 'Taxi between airport and conference centre on arrival and departure',
    cost: 7000,
    currency: 'KSh',
  },
]
const product = 1
const p = {
  id: 1,
  name: 'prod',
  description: 'short description',
  cost: '111',
}
const old = {
  firstName: '',
  lastName: '',
  nickName: '',
  passportName: '',
  gender: 'f',
  residence: '',
  organisation: '',
  website: '',
  orgtype: '',
  address: '',
  town: '',
  state: '',
  zipcode: '',
  country: '',
  telephone: '',
  accommodation: '',
  products: '',
  email: '',
  password: '',
  'password-confirm': '',
}
const errorMessage: {[key: string]: string} = {
  firstName: '',
  lastName: '',
  nickName: 'Must be at least 3 characters long.',
  passportName: '',
  gender: 'Pick one already!',
  accommodation: 'Please select an option that is compatible with your gender.',
}

function FormInput({inputType, inputId, labelText, isRequired, inputOptions, jsonData, notice}:{inputType: 'text'|'password'|'radio'|'radioAndText', inputId: string, labelText: string, isRequired?: boolean, inputOptions?: {[key: string]: string}, jsonData: string, notice?: string}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-stretch sm:justify-center pt-4">
        <label
          htmlFor={inputId}
          className="font-medium pt-2 mr-2 sm:pb-2">
          {labelText}{isRequired ? ' *' : ''}
        </label>
        <div className='flex flex-col'>
        {
          ['text', 'email', 'password'].includes(inputType) &&
          <TextInput inputId={inputId} inputType={inputType} isRequired={isRequired} jsonData={jsonData} />
        }
        {
          inputType === 'radio' &&
          <RadioInput inputId={inputId} isRequired={isRequired} inputOptions={inputOptions} jsonData={jsonData} />
        }
        {
          inputType === 'radioAndText' &&
          <div>
            <RadioAndTextInput inputId={inputId} isRequired={isRequired} inputOptions={inputOptions} jsonData={jsonData} />
          </div>
        }
        {
          errorMessage[inputId] &&
          <span className="bg-red-300 px-4 py-2 mx-2 rounded-b" role="alert">
            {errorMessage[inputId]}
          </span>
        }
        </div>
        </div>
        <div>
        {
          notice &&
          <p className="notice font-normal text-sky-800 bg-sky-100 border border-sky-200 rounded py-3 px-4 space-y-3 my-2">
            {notice}
          </p>
        }
      </div>
    </>
  )
}

function TextInput({inputId, inputType, isRequired, jsonData}: {
  inputId: string,
  inputType: 'text'|'email'|'password',
  isRequired?: boolean,
  jsonData: string
}) {
  return (
    <>
        <input
          id={inputId}
          type={inputType}
          className={'bg-white border p-2 rounded' + (errorMessage[inputId] ? ' border-red-500' : '')}
          name={inputId}
          autoComplete={inputId}
          value={jsonData}
          required={isRequired}
          autoFocus />
    </>
  )
}

function RadioInput({
  inputId,
  isRequired,
  inputOptions,
  jsonData,
}: {
  inputId: string,
  isRequired?: boolean,
  inputOptions?: {[key: string]: string},
  jsonData: string,
}) {
  return (
    <div className='py-2 space-y-2 px-4 border border-gray-300 rounded'>
      {
        Object.entries(inputOptions || {}).map((entry, index) => {
          return (
            <SoloRadio value={entry[0]} label={entry[1]} index={index} inputId={inputId} isRequired={isRequired} jsonData={jsonData}/>
          )
        })
      }
    </div>
  )
}

function SoloRadio({
  value,
  label,
  index,
  inputId,
  isRequired,
  jsonData,
}: {
  value: string,
  label: string,
  index: number,
  inputId: string,
  isRequired?: boolean,
  jsonData: string,
}){
  return (
    <div className={'flex flex-row justify-start' + (errorMessage[inputId] ? ' text-red-500':'')}>
      <input
        id={inputId + (index + 1)}
        type='radio'
        name='option'
        className={'mr-2' + (errorMessage[inputId] ? ' border-red-500' : '')}
        value={value}
        checked={ jsonData === value ? true : false }
        required={isRequired}
        />
      <label className="self-center" htmlFor={inputId}>{label}</label>
    </div>
  )
}

function RadioAndTextInput({
  inputId,
  isRequired,
  inputOptions,
  jsonData,
}: {
  inputId: string,
  isRequired?: boolean,
  inputOptions?: {[key: string]: string},
  jsonData: string,
}) {
  return (
    <div className='py-2 space-y-2 px-4 border border-gray-300 rounded'>
      {
        Object.entries(inputOptions || {}).map((entry, index) => {
          return (
            <SoloRadio value={entry[0]} label={entry[1]} index={index} inputId={inputId} isRequired={isRequired} jsonData={jsonData}/>
          )
        })
      }
      <TextInput inputId={inputId} inputType='text' isRequired={isRequired} jsonData={jsonData} />
    </div>
  )
}


export default function Register() {
  return (
    <>
      <div  className="container flex justify-center w-full p-4 mx-auto">
        <div className="card max-w-2xl bg-gray-100 dark:bg-gray-700">
          <div className="card-head text-black bg-gray-200 border-b border-gray-300 rounded-t py-3 px-4">
            Register
          </div>
          <div className="card-body text-black bg-white py-3 px-4">
            <form
              method="POST"
              action={ loggedIn ? '/api/register' : '/api/saveUser' }>
              <div className="notice text-sky-800 bg-sky-100 border border-sky-200 rounded py-3 px-4 space-y-3">
                <span className='font-medium'>Privacy notice:</span>
                <p>At the conference, we will produce printed lists of attendants including your name (replaced by a nickname if you enter one), e-mail, name of organisation and IT skills.</p>
                <p>If you do not wish to be included, please contact us by e-mail.</p>
                <p>We do not distribute this data in any digital form.</p>
              </div>
              <FormInput inputType='text' inputId='firstName' labelText='First name' isRequired={true} jsonData={old.firstName}/>
              <FormInput inputType='text' inputId='lastName' labelText='Last name' isRequired={true} jsonData={old.lastName}/>
              <FormInput inputType='text' inputId='nickName' labelText='Nickname' isRequired={false} jsonData={old.nickName} notice='A nickname is only necessary  if you do not want to be known by your real name. Please leave the field empty otherwise.' />
              <FormInput inputType='text' inputId='passportName' labelText='Name on Passport' isRequired={true} jsonData={old.passportName} notice='For the conference centre, we need to know your official name. Please do not enter your passport number here.' />
              <FormInput inputType='radio' inputId='gender' labelText='Gender' isRequired={true} inputOptions={{'m': 'Male', 'f': 'Female'}} jsonData={old.gender} />
              <FormInput inputType='text' inputId='residence' labelText='Country of residence' isRequired={true} jsonData={old.residence} />

              {/* if not logged in */}
              <FormInput inputType='text' inputId='organisation' labelText='Organisation' isRequired={true} jsonData={old.organisation} notice="If you don't have an organisation, use your lastname." />
              <FormInput inputType='text' inputId='website' labelText='Website' isRequired={false} jsonData={old.website} />
              <FormInput inputType='radioAndText' inputId='orgtype' labelText='Organisation Type' isRequired={true} inputOptions={{'mission': 'Mission', 'church': 'Church', 'education': 'Education', 'business': 'Business', 'non-profit': 'Non-profit', 'other': 'Other, please specify'}} jsonData={old.orgtype} />
              <FormInput inputType='text' inputId='address' labelText='Billing address' isRequired={true} jsonData={old.address} />
              <FormInput inputType='text' inputId='town' labelText='Town/City' isRequired={true} jsonData={old.town} />
              <FormInput inputType='text' inputId='state' labelText='Province/County/State' isRequired={false} jsonData={old.state} />
              <FormInput inputType='text' inputId='zipcode' labelText='Postcode/Zip' isRequired={true} jsonData={old.zipcode} />
              <FormInput inputType='text' inputId='country' labelText='Country' isRequired={true} jsonData={old.country} />
              <FormInput inputType='text' inputId='telephone' labelText='Telephone' isRequired={true} jsonData={old.telephone} />
              {/* else, i.e. is logged in */}
              <FormInput inputType='text' inputId='organisation' labelText='Organisation' isRequired={true} jsonData={old.organisation} />
              {/* end if */}

              {/* Accommodation options */}
              <div className="flex flex-col sm:flex-row items-stretch sm:justify-center pt-4">
                <label
                  htmlFor='accommodation'
                  className="font-medium pt-2 mr-2 sm:pb-2">
                  Accommodation*
                </label>
                <div className="flex flex-col items-stretch sm:justify-center">
                  <div className={'py-2 space-y-2 px-4 border border-gray-300 rounded' + (errorMessage['accommodation'] ? ' border-red-500':'')}>
                    { acc.map((entry, index) => {
                      return (
                        <div className={'flex flex-col justify-start'}>
                          <div className='flex flex-row justify-start'>
                            <input
                              id={'accommodation' + (entry.id)}
                              type='radio'
                              name='option'
                              className={'mr-2' + (errorMessage['accommodation'] ? ' border-red-500' : '')}
                              value={entry.label}
                              checked={ old.accommodation === entry.label ? true : false }
                              required={true}
                              />
                            <label className="font-normal" htmlFor={entry.label}>{entry.label}</label>
                          </div>
                          <div className='font-light'>{entry.description}</div>
                          <div>{entry.currency} {entry.cost}</div>
                        </div>
                      )
                    })}
                  </div>
                  {
                    errorMessage['accommodation'] &&
                    <span className="bg-red-300 px-4 py-2 mx-2 rounded-b" role="alert">
                      {errorMessage['accommodation']}
                    </span>
                  }
                </div>
              </div>

              <div className="notice font-normal text-sky-800 bg-sky-100 border border-sky-200 rounded py-3 px-4 space-y-3 mt-4">
                <p>
                  Due to the administrative effort that is associated with commuting participants and the small size of the organisational team, we have chosen not to offer the commuting option by default. If you would prefer to commute anyway, please contact us at <a className='text-sky-500' href='mailto:info@iccm-africa.org'>info@iccm-africa.org</a>.
                </p>
                <p>
                  If your organisation is not able to cover the cost of the conference, it is possible to request a sponsorship. Please send an e-mail to <a className='text-sky-500' href='mailto:sponsorships@iccm-africa.org'>sponsorships@iccm-africa.org</a> in this case.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:justify-center pt-4">
                <label
                  htmlFor='products'
                  className="font-medium pt-2 mr-2 sm:pb-2">
                  Additional products
                </label>
                <div className="flex flex-col items-stretch sm:justify-center">
                  <div className={'py-2 space-y-2 px-4 border border-gray-300 rounded' + (errorMessage['products'] ? ' border-red-500':'')}>
                    { products.map((entry, index) => {
                      return (
                        <div className={'flex flex-col justify-start'}>
                          <div className='flex flex-row justify-start'>
                            <input
                              id={'products' + (entry.id)}
                              type='checkbox'
                              name='option'
                              className={'mr-2' + (errorMessage['products'] ? ' border-red-500' : '')}
                              value={entry.label}
                              checked={ old.products === entry.label ? true : false }
                              required={true}
                              />
                            <label className="font-normal" htmlFor={entry.label}>{entry.label}</label>
                          </div>
                          <div className='font-light'>{entry.description}</div>
                          <div>{entry.currency} {entry.cost}</div>
                        </div>
                      )
                    })}
                  </div>
                  {
                    errorMessage['products'] &&
                    <span className="bg-red-300 px-4 py-2 mx-2 rounded-b" role="alert">
                      {errorMessage['products']}
                    </span>
                  }
                </div>
              </div>
              <FormInput inputType='text' inputId='email' labelText='E-mail address' isRequired={true} jsonData={old.email}/>
              {/* if not logged in */}
              <FormInput inputType='password' inputId='password' labelText='Password' isRequired={true} jsonData={old.password}/>
              <FormInput inputType='password' inputId='password-confirm' labelText='Confirm Password' isRequired={true} jsonData={old['password-confirm']}/>
                  {/* <input id="password-confirm" type="password" className="form-control" name="password_confirmation" required autoComplete="new-password" /> */}
              {/* end if */}
              <div className="form-group row mb-0">
                <div className="col-md-6 offset-md-4">
                  <button type="submit" className="border border-sky-200 rounded py-3 px-4 space-y-3 my-2">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
