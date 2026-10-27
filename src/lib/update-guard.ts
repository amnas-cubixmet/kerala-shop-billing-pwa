'use client';
import {useEffect} from 'react';

/** In-memory guard for unsaved forms or a bill currently being edited. */
const active = new Set<string>();
const GUARD_EVENT = 'shop:update-guard-changed';
export function hasPendingShopChanges(): boolean { return active.size > 0; }
export function useUpdateHold(name: string, pending: boolean): void {
  useEffect(() => {
    if (pending) active.add(name); else active.delete(name);
    window.dispatchEvent(new Event(GUARD_EVENT));
  },[name,pending]);
  useEffect(() => () => {
    active.delete(name);
    window.dispatchEvent(new Event(GUARD_EVENT));
  },[name]);
}
export const UPDATE_GUARD_CHANGED = GUARD_EVENT;
