/* global ENABLE_DEV_FEATURES */

import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

import { SettingsIcon, TrashcanIcon } from '@k5ui/icons';
import { FlexGroup } from '@k5ui/layout';
import { IconButton } from '@k5ui/button';
import { colors, gridSize } from '@k5ui/theme';

import { useList } from '../../providers/List';
import { useUIHooks } from '../../providers/Hooks';
import UpdateManyItemsModal from '../../components/UpdateManyItemsModal';
import DeleteManyItemsModal from '../../components/DeleteManyItemsModal';
import List from '../../classes/List';

export const ManageToolbar = styled.div<{ isVisible? }>(({ isVisible }) => ({
  height: 35,
  marginBottom: gridSize * 2,
  marginTop: gridSize,
  visibility: isVisible ? 'visible' : 'hidden',
}));
const SelectedCount = styled.div({
  color: colors.N40,
  marginRight: gridSize,
});

const UpdateItems = ({ selectedItems, onUpdateMany }) => {
  const [updateModalIsVisible, setUpdateModal] = useState(false);

  let { list } = useList();
  if (!list.access.update) return null;
  const handleUpdate = () => {
    setUpdateModal(false);
    onUpdateMany();
  };

  return (
    <Fragment>
      <IconButton
        appearance="primary"
        icon={SettingsIcon}
        onClick={() => setUpdateModal(true)}
        variant="nuance"
        data-test-name="update"
      >
        Update
      </IconButton>
      <UpdateManyItemsModal
        isOpen={updateModalIsVisible}
        items={selectedItems}
        list={list}
        onClose={() => setUpdateModal(false)}
        onUpdate={handleUpdate}
      />
    </Fragment>
  );
};

const DeleteItems = ({ selectedItems, onDeleteMany }: $TSFixMe) => {
  const [deleteModalIsVisible, setDeleteModal] = useState(false);
  let { list } = useList();

  if (!list.access.update) return null;
  const handleDelete = () => {
    setDeleteModal(false);
    onDeleteMany();
  };

  return (
    <Fragment>
      <IconButton
        appearance="danger"
        icon={TrashcanIcon}
        onClick={() => setDeleteModal(true)}
        variant="nuance"
        data-test-name="delete"
      >
        Delete
      </IconButton>
      <DeleteManyItemsModal
        isOpen={deleteModalIsVisible}
        itemIds={selectedItems}
        list={list}
        onClose={() => setDeleteModal(false)}
        onDelete={handleDelete}
      />
    </Fragment>
  );
};

const renderActions = ({ ...props }) => {
  let { listManageActions } = useUIHooks();

  if (!ENABLE_DEV_FEATURES) return null;

  if (listManageActions) {
    return listManageActions({ ...props, UpdateItems, DeleteItems });
  }
  return (
    <Fragment>
      <UpdateItems {...props} />
      <DeleteItems {...props} />
    </Fragment>
  );
};

type Props = {
  list: List;
  onDeleteMany: (x0?: $TSFixMe) => void;
  onUpdateMany: (x0?: $TSFixMe) => void;
  selectedItems: string[];
  pageSize?: number;
  totalItems?: number;
};

export default function ListManage(props: Props) {
  const { selectedItems } = props;

  const { pageSize, totalItems } = props;
  const selectedCount = selectedItems.length;

  return (
    <Fragment>
      <FlexGroup align="center">
        <SelectedCount>
          {selectedCount} of {Math.min(pageSize, totalItems)} Selected
        </SelectedCount>
        {renderActions({ ...props })}
      </FlexGroup>
    </Fragment>
  );
}
