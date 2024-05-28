import { Box, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/global/Header';
import { tokens } from '../../theme';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { validateCreateAdPost } from '../../utils/validate';
import { createAdPostValues } from '../../utils/initialValues';
import CustomFormik from '../../utils/CustomFormik';
import InputField from '../../components/forms/InputField';
import SubmitButton from '../../components/forms/SubmitButton';
import { errorNotification, successNotification } from '../../utils/helpers';
axios.defaults.withCredentials = true;
import { convertToRaw, EditorState } from 'draft-js';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const CreateAdPost = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const initialValues = createAdPostValues();
  const validationSchema = validateCreateAdPost();
  const history = useNavigate();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState(null);
  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const handleSubmit = async (values) => {
    if (content === null) {
      errorNotification('Ad content is empty');
    } else {
      const payload = {
        title: values.title,
        whatsapp: values.whatsapp,
        telegram: values.telegram,
        content: content,
      };
      console.log('payload', payload);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/general/create-ad-post`,
          payload,
          { withCredentials: true }
        );
        console.log(response);
        if (response.status === 200) {
          const data = response.data;
          successNotification(data.message);
          history('/ad-posts');
        } else {
          errorNotification(response?.data?.error);
        }
      } catch (error) {
        errorNotification(error?.response?.data?.error);
      }
    }
  };

  return (
    <>
      <Head pageTitle="Add New Ad Post" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header title="ADD NEW AD POST" subtitle="Create a new Ad Post from here" />
          </Box>
          <CustomFormik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Box sx={{ margin: '40px 0px 20px 0px' }}>
              <InputField name="title" placeholder="Ad Post Title" />
            </Box>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                '& > div': {
                  gridColumn: isNoneMobile ? undefined : 'span 4',
                },
              }}
              m="40px 0 0 0"
            >
              <InputField name="whatsapp" placeholder="WhatsApp group link" />
              <InputField name="telegram" placeholder="Telegram group link" />
            </Box>

            <Box
              sx={{
                margin: '40px 0px',
                padding: '10px',
                background: colors.primary[400],
                height: '400px',
                color: colors.grey[100],
                fontSize: '16px',
                overflow: 'scroll',
              }}
            >
              <Editor
                sx={{}}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                mention={{
                  separator: ' ',
                  trigger: '@',
                  suggestions: [
                    { text: 'APPLE', value: 'apple' },
                    { text: 'BANANA', value: 'banana', url: 'banana' },
                    { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                    { text: 'DURIAN', value: 'durian', url: 'durian' },
                    { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                    { text: 'FIG', value: 'fig', url: 'fig' },
                    { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                    { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                  ],
                }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="50px">
              <SubmitButton title="Add New Ad Post" isNoneMobile={isNoneMobile} />
            </Box>
          </CustomFormik>
          <Typography sx={{ fontSize: '25px', margin: '20px 0px' }}>Preview</Typography>
          <Box
            style={{ height: '300px', overflow: 'auto' }}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></Box>
        </Box>
      </main>
    </>
  );
};

export default CreateAdPost;
