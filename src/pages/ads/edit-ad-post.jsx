import { Box, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/global/Header';
import { tokens } from '../../theme';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { validateUpdateAdPost } from '../../utils/validate';
import { updateAdPostValues } from '../../utils/initialValues';
import CustomFormik from '../../utils/CustomFormik';
import InputField from '../../components/forms/InputField';
import SubmitButton from '../../components/forms/SubmitButton';
import { errorNotification, successNotification } from '../../utils/helpers';
axios.defaults.withCredentials = true;
import { convertToRaw, ContentState, convertFromHTML, EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import useFetchCredential from '../../api/useFetchCredential';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

const EditAdPost = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const { data, loading, error } = useFetchCredential(`general/single-ad-post/${id}`);

  const initialValues = updateAdPostValues(data ? data.data : null);
  const validationSchema = validateUpdateAdPost();
  const history = useNavigate();
  const [content, setContent] = useState(null);
  const [editorState, setEditorState] = useState(null);

  useEffect(() => {
    const state = data
      ? ContentState.createFromBlockArray(convertFromHTML(`${data.data.content}`))
      : ContentState.createFromBlockArray(convertFromHTML('<p>Welcome</p>'));
    setEditorState(EditorState.createWithContent(state));
  }, [data]);

  // const [editorState, setEditorState] = useState(
  //   EditorState.createWithContent(
  //     ContentState.createFromBlockArray(convertFromHTML(`${data ? data?.data.content : 'Welcome'}`))
  //   )
  // );

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
        slug: values.slug,
        content: content,
      };
      console.log('payload', payload);

      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/general/update-ad-post/${id}`,
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
      <Head pageTitle="Edit Ad Post" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header
              title={`Edit Ad Post - ${data ? data.data.title : ''}`}
              subtitle="Edit ad post"
            />
          </Box>
          {data && (
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {/* <Box sx={{ margin: '40px 0px 20px 0px' }}>
              <InputField name="title" placeholder="Ad Post Title" />
            </Box> */}
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
                <InputField name="title" placeholder="Ad post title" />
                <InputField name="slug" placeholder="Ad page link" />
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
                {data && (
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
                )}
              </Box>

              <Box display="flex" justifyContent="end" mt="50px">
                <SubmitButton title="Update Ad Post" isNoneMobile={isNoneMobile} />
              </Box>
            </CustomFormik>
          )}
          {loading && <ProgressCircle progress="0.5" />}
          {error && <div style={{ color: 'red !important', fontSize: '20px' }}>{error}</div>}
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

export default EditAdPost;
