import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import DownloadModal from "../../components/DownloadModal";

export default {
  title: 'Components|DownloadModal',
  component: DownloadModal
};

export const WithDefault = () => (
  ProviderWrapper(
    <div style={{ margin: '3rem' }}>
        <DownloadModal
            open={true}
            files={[{name: "Devis 20.05.2020", url: "test.pdf"}, {name: "Devis 05.04.2020", url: "test.pdf"}, {name: "Devis 14.02.2020", url: 'test.pdf'}]}
            type={"devis"}
        />
    </div>
  )
);
