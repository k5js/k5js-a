/* global ENABLE_DEV_FEATURES */

import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

import { SettingsIcon, TrashcanIcon } from '@k5ui/icons';
import { FlexGroup } from '@k5ui/layout';
import { IconButton } from '@k5ui/button';
import { colors, gridSize } from '@k5ui/theme';

import UpdateManyItemsModal from '../../components/UpdateManyItemsModal';
import DeleteManyItemsModal from '../../components/DeleteManyItemsModal';

export const ManageToolbar = styled.div(({ isVisible }) => ({
  height: 35,
  marginBottom: gridSize * 2,
  marginTop: gridSize,
  visibility: isVisible ? 'visible' : 'hidden',
}));
const SelectedCount = styled.div({
  color: colors.N40,
  marginRight: gridSize,
});

export default function ListManage(props) {
  const { onDeleteMany, onUpdateMany, selectedItems } = props;
  const [deleteModalIsVisible, setDeleteModal] = useState(false);
  const [updateModalIsVisible, setUpdateModal] = useState(false);

  const handleDelete = () => {
    setDeleteModal(false);
    onDeleteMany();
  };
  const handleUpdate = () => {
    setUpdateModal(false);
    onUpdateMany();
  };

  const { list, pageSize, totalItems } = props;
  const selectedCount = selectedItems.length;

  return (
    <Fragment>
      <FlexGroup align="center">
        <SelectedCount>
          {selectedCount} of {Math.min(pageSize, totalItems)} Selected
        </SelectedCount>
        {ENABLE_DEV_FEATURES ? (
          list.access.update ? (
            <IconButton
              appearance="primary"
              icon={SettingsIcon}
              onClick={() => setUpdateModal(true)}
              variant="nuance"
              data-test-name="update"
            >
              Update
            </IconButton>
          ) : null
        ) : null}
        {list.access.update ? (
          <IconButton
            appearance="danger"
            icon={TrashcanIcon}
            onClick={() => setDeleteModal(true)}
            variant="nuance"
            data-test-name="delete"
          >
            Delete
          </IconButton>
        ) : null}
      </FlexGroup>

      <UpdateManyItemsModal
        isOpen={updateModalIsVisible}
        items={selectedItems}
        list={list}
        onClose={() => setUpdateModal(false)}
        onUpdate={handleUpdate}
      />
      <DeleteManyItemsModal
        isOpen={deleteModalIsVisible}
        itemIds={selectedItems}
        list={list}
        onClose={() => setDeleteModal(false)}
        onDelete={handleDelete}
      />
    </Fragment>
  );
}
