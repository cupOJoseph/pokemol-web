import React from 'react';
import {
  Input,
  InputGroup,
  Button,
  FormHelperText,
  FormLabel,
  Box,
} from '@chakra-ui/react';
import TextBox from '../components/TextBox';

const RageInput = ({ register, setValue, label, type, max, mb = 2 }) => {
  const setMax = () => {
    setValue(type, max);
  };

  return (
    <Box mb={mb}>
      <TextBox as={FormLabel} size='xs' htmlFor={type} mb={2}>
        {label}
      </TextBox>
      <InputGroup>
        <Button
          onClick={() => setMax()}
          size='xs'
          position='absolute'
          right='0'
          top='-30px'
          variant='outline'
        >
          {`Max: ${max}`}
        </Button>
        <Input
          name={type}
          placeholder='0'
          ref={register({
            pattern: {
              value: /[0-9]/,
              message: `${type} must be a number`,
            },
          })}
        />
      </InputGroup>
      <FormHelperText>
        {`You can Rage up to ${max} ${
          type === 'loot' ? 'loot ' : null
        } shares.`}
      </FormHelperText>
    </Box>
  );
};

export default RageInput;
