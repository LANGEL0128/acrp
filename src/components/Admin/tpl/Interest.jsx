import React from 'react'

export const Interest = ({interests, interests_ids}) => {
    console.log(interests_ids);
  return (
    <>
        {
            interests.map((interest) => {
              return (<label className='col-md-6' key={ interest.id } >
                  <input type="checkbox" name="interests" defaultChecked={ interests_ids.includes(interest.id) }
                  multiple
                  value={ interest.id } />{ interest.name }
                </label>)
            })
        }
    </>
  )
}
